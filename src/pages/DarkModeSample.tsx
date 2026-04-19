import React from 'react';
import styled from 'styled-components';
import { useStore } from '../store/useStore';

const ThemeCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: 30px;
  border-radius: 8px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ToggleBtn = styled.button`
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const DarkModeSample: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useStore();

  return (
    <div>
      <h2>다크모드 제어 (Zustand + Styled-Components)</h2>
      <p>전역 상태를 활용하여 동적으로 테마를 스위칭하는 예제입니다.</p>

      <ThemeCard>
        <h3>현재 테마: {isDarkMode ? '🌙 다크 모드' : '☀️ 라이트 모드'}</h3>
        <p>전체 레이아웃의 `ThemeProvider` 가 참조하는 값을 Zustand 상태로 제어합니다.</p>
        
        <ToggleBtn onClick={toggleDarkMode}>
          <i className={isDarkMode ? "ri-sun-line" : "ri-moon-line"}></i>
          {isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
        </ToggleBtn>
      </ThemeCard>
    </div>
  );
};

/*
[설명]
상단 헤더(Header.tsx)에 있는 테마 변경 버튼과 완전히 동일한 동작을 수행합니다.

실무 패턴:
- Theme 상태는 컴포넌트 트리의 아주 높은 곳(MainLayout)에 위치한 `<ThemeProvider>` 에서 소모됩니다.
- 깊숙한 곳(이 페이지)에서 버튼을 눌러 상태를 바꾸려면 프롭스 드릴링이 심해지므로 Zustand 전역 상태 관리를 사용합니다.
- 상태가 바뀌면, `theme` 객체가 실시간으로 치환되어 styled-components 요소들 색깔이 한꺼번에 스위칭됩니다.
*/
