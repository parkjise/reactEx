import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 20px;
`;

const DropdownButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  overflow: hidden;
  z-index: 10;
`;

const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const options = ['최신순', '인기순', '가격 낮은순', '가격 높은순'];

export const DropdownSample: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(options[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // [중요 로직] 드롭다운 바깥 영역 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // 이벤트 발생 타겟이 드롭다운 컨테이너(ref) 바깥일 경우 닫기
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    // 모달이 열려있을 때만 click 이벤트 리스너를 document에 등록
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      <h2>커스텀 드롭다운 (Click Outside)</h2>
      <p>직접 만든 드롭다운 UI와 '바깥쪽 클릭 시 닫힘' 이벤트를 조합한 예제입니다.</p>
      
      <DropdownContainer ref={dropdownRef}>
        <DropdownButton onClick={() => setIsOpen(!isOpen)}>
          {selectedOpt} <i className="ri-arrow-down-s-line" />
        </DropdownButton>

        {isOpen && (
          <DropdownMenu>
            {options.map((opt) => (
              <DropdownItem 
                key={opt}
                onClick={() => {
                  setSelectedOpt(opt);
                  setIsOpen(false);
                }}
              >
                {opt}
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </DropdownContainer>
    </div>
  );
};

/*
[설명]
셀렉트박스 대신 HTML 레이아웃으로 만든 커스텀 드롭다운과 바깥쪽 클릭을 감지하는 패턴입니다.

실무 패턴:
- `useRef`를 사용하여 드롭다운의 최상단 div를 참조합니다.
- `document.addEventListener`를 붙여 사용자가 문서 전체에서 어디를 클릭했는지 리스너를 답니다.
- 클릭한 타겟 `e.target`이 `ref.current.contains()` 안쪽이 아니라면(즉, 바깥이라면) 상태를 false로 변경합니다.
- useEffect에서 이벤트 제거(`removeEventListener`)를 잊으면 메모리 릭 발생 및 성능저하가 일어나므로 반드시 클린업(Clean-up)을 해줍니다.
*/
