// src/pages/styled/StyledSidebarLayoutSample.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { StyledButton } from '../../components/styled/StyledButton';
import { CodeViewer } from '../../components/CodeViewer';

const AppContainer = styled.div`
  display: flex;
  height: 400px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;

const Sidebar = styled.aside<{ isOpen: boolean }>`
  width: 240px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  transition: transform 0.3s ease-in-out;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  /* 모바일에서 슬라이드 오버 형태로 변경 */
  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  }
`;

const MainContent = styled.main`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
  overflow-y: auto;
`;

const NavItem = styled.div`
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
  background-color: rgba(49, 106, 255, 0.1);
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`;

const MobileHeader = styled.div`
  display: none;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

export const StyledSidebarLayoutSample: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const codeString = `/* [설명]
Sidebar Layout은 데스크톱에서는 고정 내비게이션, 모바일에서는 열고 닫히는 패널로 동작하는 앱 구조입니다.
isOpen prop으로 위치와 표시 상태를 제어하면 같은 마크업으로 반응형 메뉴를 구현할 수 있습니다.
*/
const Sidebar = styled.aside<{ isOpen: boolean }>\`
  width: 240px;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    position: absolute; /* 모바일에서는 화면 위에 덮음 */
    z-index: 10;
    transform: \${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  }
\`;

const MainContent = styled.main\`
  flex: 1; /* 남은 영역 모두 차지 */
  overflow-y: auto;
\`;`;

  return (
    <SamplePageLayout
      title="16. Sidebar Layout"
      description="PC에서는 고정(Fixed)되어 있고, 모바일에서는 토글(Toggle) 애니메이션으로 나타나는 사이드바 레이아웃 패턴입니다. 화면 크기를 줄여보세요."
    >
      <StyledCard>
        <MobileHeader>
          <StyledButton size="small" onClick={() => setIsOpen(!isOpen)}>
            ☰ 메뉴 토글
          </StyledButton>
        </MobileHeader>

        <AppContainer>
          <Sidebar isOpen={isOpen}>
            <h3 style={{ marginBottom: '20px' }}>Admin Menu</h3>
            <NavItem>Dashboard</NavItem>
            <div style={{ padding: '10px 15px', color: 'gray' }}>Users</div>
            <div style={{ padding: '10px 15px', color: 'gray' }}>Settings</div>
          </Sidebar>
          
          <MainContent>
            <h3>메인 컨텐츠 영역</h3>
            <p style={{ marginTop: '10px', lineHeight: '1.6', color: 'var(--textMuted)' }}>
              flexbox를 활용하여 Sidebar는 고정 너비를 가지고,<br/>
              MainContent는 <code>flex: 1</code> 속성을 통해 남은 너비를 모두 차지하게 됩니다.<br/><br/>
              브라우저 창 크기를 줄여(모바일 뷰) 보시면, 사이드바가 화면 밖으로 숨겨지고, '☰ 메뉴 토글' 버튼을 통해서만 열고 닫을 수 있습니다.
            </p>
          </MainContent>
        </AppContainer>

        <div style={{ marginTop: '30px' }}>
          <CodeViewer rawCode={codeString} language="tsx" filename="Sidebar Layout" />
        </div>
      </StyledCard>
    </SamplePageLayout>
  );
};
