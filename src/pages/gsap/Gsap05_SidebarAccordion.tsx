import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { StyledButton } from '../../components/styled/StyledButton';
import { CodeViewer } from '../../components/CodeViewer';
import { gsap } from '../../utils/gsapPlugins';
import { useGSAP } from '@gsap/react';

const LayoutContainer = styled.div`
  display: flex;
  height: 300px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  overflow: hidden;
  position: relative;
`;

const Sidebar = styled.div`
  width: 250px;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  /* GSAP 애니메이션을 위해 절대 위치 혹은 flex-shrink 등을 활용 */
  flex-shrink: 0;
`;

const MainContent = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NavItem = styled.div`
  padding: 12px;
  background: rgba(49, 106, 255, 0.1);
  border-radius: 8px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

export const Gsap05_SidebarAccordion: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);

  // useRef를 사용하여 타임라인 인스턴스 자체를 보관 (리렌더링 시 재생성 방지)
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    // 마운트 시 초기 타임라인을 한 번만 생성해둡니다.
    tl.current = gsap.timeline({ paused: true })
      .to('.sidebar-nav-item', {
        x: -50,
        opacity: 0,
        duration: 0.2,
        stagger: 0.05,
        ease: 'power2.in'
      })
      .to('.sidebar', {
        width: 0,
        paddingLeft: 0,
        paddingRight: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.inOut'
      }, '-=0.1');
      
  }, { scope: containerRef });

  // 버튼 클릭 시 타임라인을 정방향(play) 또는 역방향(reverse)으로 재생
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      tl.current?.play(); // 열려있으면 닫기(play)
    } else {
      tl.current?.reverse(); // 닫혀있으면 열기(reverse)
    }
  };

  const codeString = `const tl = useRef<gsap.core.Timeline>();

useGSAP(() => {
  // 1. 타임라인을 한 번만 생성하여 저장 (paused: true 설정으로 즉시 실행 방지)
  tl.current = gsap.timeline({ paused: true })
    .to('.sidebar-nav-item', { x: -50, opacity: 0, duration: 0.2, stagger: 0.05 }) // 메뉴들 날아가고
    .to('.sidebar', { width: 0, paddingLeft: 0, paddingRight: 0, duration: 0.4 }, '-=0.1'); // 사이드바가 접힘
}, { scope: containerRef });

const toggleSidebar = () => {
  setIsOpen(!isOpen);
  if (isOpen) {
    tl.current?.play();    // 닫기 (정방향 재생)
  } else {
    tl.current?.reverse(); // 열기 (역방향 재생)
  }
};`;

  return (
    <SamplePageLayout
      title="5. 사이드바 열림/닫힘 및 내부 요소 애니메이션"
      description="사이드바 컨테이너 자체의 크기(width)만 줄이는 것이 아니라, 내부의 텍스트와 메뉴 아이템들이 먼저 페이드아웃 되면서 부드럽게 접히는 디테일한 인터랙션을 구현합니다."
      learningPoints={[
        'React 상태(isOpen) 변경에 의존하여 단순히 조건부 렌더링을 하지 않고, GSAP 타임라인의 play() / reverse() 메서드를 사용하여 양방향 애니메이션을 제어합니다.',
        '단순히 너비만 width: 0으로 줄이면 내부 텍스트가 찌그러집니다. 텍스트 요소(nav item)를 먼저 숨기고(opacity 0, x 이동) 컨테이너 너비를 줄이는 타임라인을 짜면 매우 부드러워집니다.',
        'useGSAP 훅 내부에서 tl.current에 타임라인 인스턴스를 캐싱해 두어 버튼 클릭 함수에서 안전하게 제어합니다.'
      ]}
      whyImportant="대시보드 레이아웃에서 사이드바 토글은 필수 기능입니다. CSS Transition만으로 구현하면 내부 글씨가 강제로 줄바꿈 되며 지저분해지는 경우가 많아, 이러한 GSAP 시퀀싱 패턴을 실무에서 적극 도입합니다."
    >
      <StyledCard>
        <div style={{ marginBottom: '20px' }}>
          <StyledButton onClick={toggleSidebar} variant={isOpen ? 'outline' : 'primary'}>
            사이드바 {isOpen ? '닫기' : '열기'} (Toggle Sidebar)
          </StyledButton>
        </div>

        <LayoutContainer ref={containerRef}>
          <Sidebar className="sidebar">
            <h3 className="sidebar-nav-item" style={{ marginBottom: '10px' }}>Menu</h3>
            <NavItem className="sidebar-nav-item">Dashboard</NavItem>
            <NavItem className="sidebar-nav-item">Analytics</NavItem>
            <NavItem className="sidebar-nav-item">Settings</NavItem>
            <NavItem className="sidebar-nav-item">Profile</NavItem>
          </Sidebar>
          
          <MainContent>
            <h2>메인 컨텐츠 영역</h2>
            <p style={{ marginTop: '10px', color: 'gray' }}>사이드바가 접히면 메인 영역이 부드럽게 늘어납니다.</p>
          </MainContent>
        </LayoutContainer>

        <div style={{ marginTop: '30px' }}>
          <CodeViewer rawCode={codeString} language="tsx" filename="Gsap05_SidebarAccordion.tsx" />
        </div>
      </StyledCard>
    </SamplePageLayout>
  );
};
