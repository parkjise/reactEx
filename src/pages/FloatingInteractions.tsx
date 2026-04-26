import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

// --- Styled Components ---
const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 8px;
`;

// 1. Tooltip
const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:hover .tooltip-box {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

const TooltipBox = styled.div`
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background-color: #1e293b;
  color: #fff;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  z-index: 100;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px;
    border-style: solid;
    border-color: #1e293b transparent transparent transparent;
  }
`;

// 2. Context Menu
const ContextArea = styled.div`
  height: 150px;
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textMuted};
  background-color: ${({ theme }) => theme.colors.background};
  user-select: none;
`;

const ContextMenuBox = styled.div<{ $top: number; $left: number }>`
  position: fixed;
  top: ${({ $top }) => $top}px;
  left: ${({ $left }) => $left}px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  padding: 8px 0;
  min-width: 150px;
  z-index: 1000;
  animation: scaleIn 0.1s ease-out;

  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
`;

const ContextMenuItem = styled.div`
  padding: 10px 16px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

// 3. Snackbar
const SnackbarBox = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%) translateY(${({ $isVisible }) => ($isVisible ? '0' : '50px')});
  opacity: ${({ $isVisible }) => ($isVisible ? '1' : '0')};
  background-color: #1e293b;
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 9999;
  pointer-events: none;
`;

export const FloatingInteractions: React.FC = () => {
  const [contextMenu, setContextMenu] = useState<{ visible: boolean; x: number; y: number }>({ visible: false, x: 0, y: 0 });
  const [snackbar, setSnackbar] = useState<{ visible: boolean; message: string }>({ visible: false, message: '' });

  // 우클릭 메뉴 (Context Menu) 로직
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault(); // 기본 브라우저 메뉴 차단
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const closeContextMenu = () => {
    if (contextMenu.visible) setContextMenu({ ...contextMenu, visible: false });
  };

  useEffect(() => {
    document.addEventListener('click', closeContextMenu);
    return () => document.removeEventListener('click', closeContextMenu);
  });

  // 복사 및 스낵바(Snackbar) 로직
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      showSnackbar(`"${text}" 복사 완료!`);
    });
  };

  const showSnackbar = (message: string) => {
    setSnackbar({ visible: true, message });
    setTimeout(() => {
      setSnackbar({ visible: false, message: '' });
    }, 2500); // 2.5초 후 자동 숨김
  };

  return (
    <SamplePageLayout
      title="플로팅(Floating) 인터랙션 묶음"
      icon="ri-message-3-line"
      description="마우스 오버나 특정 액션에 반응하여 화면 위에 떠오르는(Floating) 툴팁, 우클릭 메뉴, 스낵바 예제입니다."
      learningPoints={[
        'CSS :hover와 가상 요소(::after)를 결합한 순수 CSS 툴팁 구현',
        'onContextMenu 이벤트를 활용한 브라우저 기본 우클릭 메뉴 덮어쓰기',
        'e.clientX, e.clientY 좌표를 position: fixed 요소에 주입하여 커서 위치에 메뉴 띄우기',
        'navigator.clipboard API를 사용한 텍스트 복사와 자동 닫히는 스낵바(Snackbar) 연동',
      ]}
      whyImportant="공간이 부족할 때 부가 설명을 숨겨두는 툴팁, 파워 유저를 위한 우클릭 메뉴, 조용히 결과를 알려주고 사라지는 스낵바는 '전문가용 소프트웨어' 느낌을 주는 핵심 디테일입니다."
    >
      <Card>
        <Section>
          <SectionTitle><i className="ri-chat-1-line" /> 1. CSS 툴팁 (Tooltip)</SectionTitle>
          <p style={{ marginBottom: '16px', fontSize: '0.9rem', color: '#666' }}>버튼 위에 마우스를 올려보세요.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <TooltipWrapper>
              <Button variant="outline">알림 설정</Button>
              <TooltipBox className="tooltip-box">알림을 켜거나 끕니다</TooltipBox>
            </TooltipWrapper>
            <TooltipWrapper>
              <Button variant="outline"><i className="ri-question-line" /></Button>
              <TooltipBox className="tooltip-box">도움말 보기</TooltipBox>
            </TooltipWrapper>
          </div>
        </Section>

        <Section>
          <SectionTitle><i className="ri-file-copy-line" /> 2. 텍스트 복사 & 스낵바 (Snackbar)</SectionTitle>
          <p style={{ marginBottom: '16px', fontSize: '0.9rem', color: '#666' }}>코드를 클릭하면 클립보드에 복사되고 하단에 알림이 뜹니다.</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button variant="secondary" onClick={() => handleCopy('npm install styled-components')}>
              npm install styled-components
            </Button>
            <Button variant="secondary" onClick={() => handleCopy('yarn add zustand')}>
              yarn add zustand
            </Button>
          </div>
        </Section>

        <Section style={{ marginBottom: 0 }}>
          <SectionTitle><i className="ri-mouse-line" /> 3. 커스텀 컨텍스트 메뉴 (Right Click)</SectionTitle>
          <p style={{ marginBottom: '16px', fontSize: '0.9rem', color: '#666' }}>아래 점선 박스 안에서 마우스 우클릭을 해보세요.</p>
          <ContextArea onContextMenu={handleContextMenu}>
            이 영역 안에서 우클릭
          </ContextArea>
        </Section>
      </Card>

      {/* 우클릭 메뉴 렌더링 */}
      {contextMenu.visible && (
        <ContextMenuBox $top={contextMenu.y} $left={contextMenu.x}>
          <ContextMenuItem onClick={() => showSnackbar('새 탭에서 열기 선택됨')}>
            <i className="ri-window-line" /> 새 탭에서 열기
          </ContextMenuItem>
          <ContextMenuItem onClick={() => handleCopy('링크 주소 복사됨')}>
            <i className="ri-links-line" /> 링크 주소 복사
          </ContextMenuItem>
          <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '4px 0' }} />
          <ContextMenuItem style={{ color: '#EE5D50' }} onClick={() => showSnackbar('삭제 완료')}>
            <i className="ri-delete-bin-line" /> 삭제하기
          </ContextMenuItem>
        </ContextMenuBox>
      )}

      {/* 스낵바 렌더링 */}
      <SnackbarBox $isVisible={snackbar.visible}>
        <i className="ri-checkbox-circle-fill" style={{ color: '#05CD99' }} />
        {snackbar.message}
      </SnackbarBox>

    </SamplePageLayout>
  );
};

/*
[설명]
화면 위에 떠오르는(Floating) 3가지 필수 인터랙션을 모아두었습니다.

실무 패턴:
- 툴팁: 자바스크립트 없이 순수 CSS(`opacity`, `visibility`, `transform`)만으로 구현하는 것이 성능상 가장 유리합니다. 가상 요소(`::after`)로 말풍선 꼬리를 만들었습니다.
- 컨텍스트 메뉴: `onContextMenu` 이벤트에서 `e.preventDefault()`를 호출하면 브라우저 기본 우클릭 메뉴가 뜨지 않습니다. 이때 마우스 좌표(`clientX`, `clientY`)를 상태로 저장하여 `position: fixed`된 레이어의 top/left 값으로 사용합니다.
- 스낵바: `setTimeout`을 사용하여 일정 시간 뒤 상태를 false로 바꿔주는 것이 기본입니다. (실무에서는 동일한 메시지가 연속으로 뜰 때 기존 타이머를 취소하는 `clearTimeout` 처리를 추가합니다.)
*/
