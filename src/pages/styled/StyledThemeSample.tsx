// src/pages/styled/StyledThemeSample.tsx
import React from 'react';
import styled, { useTheme } from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { CodeViewer } from '../../components/CodeViewer';

const ThemeBox = styled.div<{ bg: string; color: string }>`
  padding: 20px;
  border-radius: 8px;
  background-color: ${({ bg }) => bg};
  color: ${({ color }) => color};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-weight: 600;
`;

export const StyledThemeSample: React.FC = () => {
  const theme = useTheme(); // JS 레벨에서 테마 값 접근

  const themeCode = `/* [설명]
theme.ts는 색상, radius, spacing 같은 디자인 토큰을 한 곳에 모아 컴포넌트가 같은 기준을 쓰게 만드는 파일입니다.
ThemeProvider와 함께 사용하면 하드코딩 색상을 줄이고 브랜드 변경이나 다크모드 대응이 쉬워집니다.
*/
// src/styles/theme.ts
export const lightTheme = {
  colors: {
    primary: '#316AFF',
    background: '#F5F6FA',
    surface: '#FFFFFF',
    text: '#2B3674',
    border: '#E2E8F0',
  },
  radius: {
    card: '10px',
  }
};

export type Theme = typeof lightTheme;

// 컴포넌트 내부에서 사용 예시:
const StyledBox = styled.div\`
  background-color: \${({ theme }) => theme.colors.surface};
  border-radius: \${({ theme }) => theme.radius.card};
  color: \${({ theme }) => theme.colors.text};
\`;`;

  return (
    <SamplePageLayout
      title="2. ThemeProvider와 theme 사용법"
      description="styled-components의 ThemeProvider를 통해 전역적으로 색상, 여백, 둥글기 등의 디자인 토큰을 주입하고 사용하는 방법입니다."
    >
      <StyledCard>
        <h3 style={{ marginBottom: '16px' }}>현재 주입된 테마 색상 (useTheme 활용)</h3>
        
        <ThemeBox bg={theme.colors.primary} color="#ffffff">
          <span>Primary Color</span>
          <span>{theme.colors.primary}</span>
        </ThemeBox>
        
        <ThemeBox bg={theme.colors.success} color="#ffffff">
          <span>Success Color</span>
          <span>{theme.colors.success}</span>
        </ThemeBox>
        
        <ThemeBox bg={theme.colors.error} color="#ffffff">
          <span>Error Color</span>
          <span>{theme.colors.error}</span>
        </ThemeBox>

        <ThemeBox bg={theme.colors.surface} color={theme.colors.text} style={{ border: `1px solid ${theme.colors.border}` }}>
          <span>Surface (Card Background) Color</span>
          <span>{theme.colors.surface}</span>
        </ThemeBox>

        <div style={{ marginTop: '24px' }}>
          <CodeViewer 
            rawCode={themeCode} 
            language="typescript" 
            filename="Theme Usage Example"
          />
        </div>
      </StyledCard>
    </SamplePageLayout>
  );
};
