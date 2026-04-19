import React, { useMemo } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useStore } from '../store/useStore';
import { lightTheme, darkTheme } from '../styles/theme';
import { GlobalStyle } from '../styles/GlobalStyle';

import { EXAMPLE_LIST } from '../constants/exampleCatalog';
import { CodeViewer } from '../components/CodeViewer';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0; 
`;

const ContentArea = styled.main`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.background};
`;

// Vite의 기능인 import.meta.glob을 사용하여 src/pages 폴더의 원본(.tsx 파일들)을 모두 텍스트(string) 형태로 불러옵니다.
const rawPages = import.meta.glob('../pages/*.tsx', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export const MainLayout: React.FC = () => {
  const { isDarkMode } = useStore();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const location = useLocation();

  // 현재 라우트 경로에 해당하는 파일 이름과 원본 코드를 찾습니다.
  const currentMenu = EXAMPLE_LIST.find((menu) => menu.path === location.pathname);
  
  const currentRawCode = useMemo(() => {
    if (!currentMenu || !currentMenu.file) return null;
    const pathKey = `../pages/${currentMenu.file}`;
    return rawPages[pathKey] || null;
  }, [currentMenu]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Sidebar />
        <MainWrapper>
          <Header />
          <ContentArea>
            <Outlet />
            
            {/* 현재 페이지 컴포넌트 밑에 항상 소스코드 뷰어를 노출시킵니다 */}
            {currentMenu && currentRawCode && (
              <CodeViewer rawCode={currentRawCode} filename={currentMenu.file!} />
            )}

          </ContentArea>
        </MainWrapper>
      </AppContainer>
    </ThemeProvider>
  );
};

/*
[설명]
앱 전체 레이아웃을 감싸는 MainLayout 컴포넌트입니다.

실무 패턴:
- `react-router-dom`의 `<Outlet />`을 중첩 라우팅 지점으로 사용합니다. Sidebar과 Header는 고정시키고, Outlet 영역만 페이지별로 동적 변경되도록(SPA) 구성했습니다.
- `styled-components`의 `ThemeProvider`를 레이아웃의 최상단에 주입하고 Zustand의 isDarkMode 전역 값을 읽어옵니다. 이 구조로 인해 어떤 하위 컴포넌트든 props에 theme이 자동으로 넘겨지게 됩니다.
*/
