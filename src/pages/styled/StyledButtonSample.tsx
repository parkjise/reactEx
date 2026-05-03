// src/pages/styled/StyledButtonSample.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { StyledButton } from '../../components/styled/StyledButton';
import { CodeViewer } from '../../components/CodeViewer';

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
  align-items: center;
`;

export const StyledButtonSample: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleLoad = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const codeString = `/* [설명]
StyledButton은 variant, size, loading, disabled 같은 버튼 상태를 props로 제어하는 공통 버튼 패턴입니다.
화면마다 버튼 CSS를 새로 만들지 않고 제한된 옵션으로 재사용하면 UI 일관성과 유지보수성이 좋아집니다.
*/
<StyledButton variant="primary">Primary</StyledButton>
<StyledButton variant="secondary">Secondary</StyledButton>
<StyledButton variant="danger">Danger</StyledButton>
<StyledButton variant="outline">Outline</StyledButton>
<StyledButton variant="ghost">Ghost</StyledButton>

<StyledButton size="small">Small</StyledButton>
<StyledButton size="medium">Medium</StyledButton>
<StyledButton size="large">Large</StyledButton>

<StyledButton isLoading={loading} onClick={handleLoad}>Click to Load</StyledButton>
<StyledButton disabled>Disabled</StyledButton>
<StyledButton fullWidth>Full Width Button</StyledButton>`;

  return (
    <SamplePageLayout
      title="3. 공통 Button 컴포넌트"
      description="styled-components를 활용하여 variant(스타일), size(크기), 상태(loading, disabled) 등 다양한 Props를 처리하는 실무형 공통 버튼 컴포넌트입니다."
    >
      <StyledCard>
        <h3>1. Variants (버튼 종류)</h3>
        <ButtonRow>
          <StyledButton variant="primary">Primary</StyledButton>
          <StyledButton variant="secondary">Secondary</StyledButton>
          <StyledButton variant="danger">Danger</StyledButton>
          <StyledButton variant="outline">Outline</StyledButton>
          <StyledButton variant="ghost">Ghost</StyledButton>
        </ButtonRow>

        <h3>2. Sizes (버튼 크기)</h3>
        <ButtonRow>
          <StyledButton size="small">Small</StyledButton>
          <StyledButton size="medium">Medium</StyledButton>
          <StyledButton size="large">Large</StyledButton>
        </ButtonRow>

        <h3>3. States (상태)</h3>
        <ButtonRow>
          <StyledButton 
            variant="primary" 
            isLoading={loading} 
            onClick={handleLoad}
          >
            {loading ? 'Processing...' : 'Click to Load (2s)'}
          </StyledButton>
          <StyledButton variant="secondary" disabled>Disabled Button</StyledButton>
        </ButtonRow>

        <h3>4. Layout (레이아웃)</h3>
        <div style={{ marginBottom: '24px' }}>
          <StyledButton fullWidth variant="outline">Full Width Button</StyledButton>
        </div>

        <CodeViewer rawCode={codeString} language="tsx" filename="Button Usage" />
      </StyledCard>
    </SamplePageLayout>
  );
};
