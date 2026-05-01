// src/pages/styled/StyledDarkModeSample.tsx
import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { CodeViewer } from '../../components/CodeViewer';
import { lightTheme, darkTheme } from '../../styles/theme';
import { StyledButton } from '../../components/styled/StyledButton';

const MockAppWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 30px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;
`;

const MockCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 20px;
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  margin-top: 20px;
`;

export const StyledDarkModeSample: React.FC = () => {
  // 샘플 내부에서만 토글하기 위한 지역 state
  const [isDark, setIsDark] = useState(false);

  const codeString = `// 최상위 App.tsx
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';

function App() {
  const [isDark, setIsDark] = useState(false);
  const activeTheme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={activeTheme}>
      <GlobalStyle />
      <AppContent>
        <button onClick={() => setIsDark(!isDark)}>토글 다크모드</button>
      </AppContent>
    </ThemeProvider>
  );
}`;

  return (
    <SamplePageLayout
      title="8. 다크모드 (Dark Mode) 구현 패턴"
      description="ThemeProvider의 theme 객체를 교체하는 것만으로 전체 애플리케이션의 색상을 손쉽게 다크모드로 전환하는 방법입니다."
    >
      <StyledCard>
        <p style={{ marginBottom: '20px' }}>
          현재 이 박스 내부만 임시로 <code>ThemeProvider</code>로 감싸서, 토글 버튼 클릭 시 하위 컴포넌트들의 테마가 라이트/다크로 전환되도록 구성했습니다.
        </p>

        {/* 데모용 독립 ThemeProvider */}
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          <MockAppWrapper>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>{isDark ? '🌙 다크 모드 활성화됨' : '☀️ 라이트 모드 활성화됨'}</h2>
              <StyledButton onClick={() => setIsDark(!isDark)} variant={isDark ? 'secondary' : 'primary'}>
                테마 전환하기
              </StyledButton>
            </div>

            <MockCard>
              <h3 style={{ marginBottom: '10px' }}>Card Component</h3>
              <p style={{ color: isDark ? darkTheme.colors.textMuted : lightTheme.colors.textMuted }}>
                테마가 바뀌면 styled-components가 자동으로 바뀐 theme 객체를 props로 내려주어, 
                새로고침 없이 실시간으로 CSS가 업데이트 됩니다.
              </p>
            </MockCard>
          </MockAppWrapper>
        </ThemeProvider>

        <div style={{ marginTop: '30px' }}>
          <CodeViewer rawCode={codeString} language="tsx" filename="DarkMode Setup" />
        </div>
      </StyledCard>
    </SamplePageLayout>
  );
};
