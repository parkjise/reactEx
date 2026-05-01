// src/pages/styled/StyledScrollbarSample.tsx
import React from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { CodeViewer } from '../../components/CodeViewer';
import { customScrollbar, hideScrollbar } from '../../styles/mixins';

const CustomScrollBox = styled.div`
  width: 100%;
  max-width: 400px;
  height: 150px;
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 15px;
  margin-bottom: 30px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;

  ${customScrollbar}
`;

const HiddenScrollBox = styled.div`
  width: 100%;
  max-width: 400px;
  height: 150px;
  overflow-y: auto;
  border: 1px dashed ${({ theme }) => theme.colors.primary};
  padding: 15px;
  margin-bottom: 30px;
  background-color: rgba(49, 106, 255, 0.05);
  border-radius: 8px;

  ${hideScrollbar}
`;

export const StyledScrollbarSample: React.FC = () => {
  const codeString = `// src/styles/mixins.ts
export const customScrollbar = css\`
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: \${({ theme }) => theme.colors.border};
    border-radius: 4px;
    &:hover {
      background: \${({ theme }) => theme.colors.textMuted};
    }
  }
\`;

export const hideScrollbar = css\`
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
\`;`;

  return (
    <SamplePageLayout
      title="18. 스크롤바 디자인 / 숨김 패턴"
      description="브라우저 기본 투박한 스크롤바를 예쁘게 커스텀하거나, 스크롤 기능은 유지하되 스크롤바만 보이지 않게 숨기는 믹스인입니다."
    >
      <StyledCard>
        <h3>1. 커스텀 스크롤바 (Custom Scrollbar)</h3>
        <p style={{ color: 'gray', marginBottom: '10px' }}>아래 박스를 스크롤 해보세요. 얇고 둥근 커스텀 스크롤바가 적용되어 있습니다.</p>
        <CustomScrollBox>
          {Array.from({ length: 10 }).map((_, i) => (
            <p key={i} style={{ marginBottom: '10px' }}>내용이 들어가는 줄입니다. (줄 번호: {i + 1})</p>
          ))}
        </CustomScrollBox>

        <h3>2. 스크롤바 숨김 (Hidden Scrollbar)</h3>
        <p style={{ color: 'gray', marginBottom: '10px' }}>아래 박스를 스크롤 해보세요. 스크롤은 정상적으로 되지만 스크롤바가 보이지 않습니다. 주로 모바일 가로 스와이프 UI에서 많이 쓰입니다.</p>
        <HiddenScrollBox>
          {Array.from({ length: 10 }).map((_, i) => (
            <p key={i} style={{ marginBottom: '10px' }}>스크롤바가 없는 컨텐츠 영역입니다. (줄 번호: {i + 1})</p>
          ))}
        </HiddenScrollBox>

        <div style={{ marginTop: '40px' }}>
          <CodeViewer rawCode={codeString} language="tsx" filename="Scrollbar Mixins" />
        </div>
      </StyledCard>
    </SamplePageLayout>
  );
};
