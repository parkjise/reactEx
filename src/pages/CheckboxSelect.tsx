import React, { useState } from 'react';
import styled from 'styled-components';

const ListContainer = styled.ul`
  margin-top: 20px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
`;

const ListItem = styled.li`
  padding: 12px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  gap: 15px;

  &:last-child {
    border-bottom: none;
  }

  &.header {
    background-color: ${({ theme }) => theme.colors.background};
    font-weight: 600;
  }
`;

const initialItems = [
  { id: 1, name: '이용약관 동의 (필수)' },
  { id: 2, name: '개인정보 수집 및 이용 동의 (필수)' },
  { id: 3, name: 'E-mail 정보 수신 동의 (선택)' },
  { id: 4, name: 'SMS 정보 수신 동의 (선택)' },
];

export const CheckboxSelect: React.FC = () => {
  const [checkedList, setCheckedList] = useState<number[]>([]);

  // 전체 선택 토글
  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIds = initialItems.map((item) => item.id);
      setCheckedList(allIds);
    } else {
      setCheckedList([]);
    }
  };

  // 개별 아이템 토글
  const handleCheckSingle = (checked: boolean, id: number) => {
    if (checked) {
      setCheckedList((prev) => [...prev, id]);
    } else {
      setCheckedList((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  const isAllChecked = checkedList.length === initialItems.length;

  return (
    <div>
      <h2>다중 체크박스와 전체 선택</h2>
      <p>결제 폼, 약관 동의, 메일 지우기 등에서 아주 흔하게 사용되는 '전체 선택/해제' 패턴입니다.</p>

      <ListContainer>
        <ListItem className="header">
          <input 
            type="checkbox" 
            checked={isAllChecked}
            onChange={handleCheckAll}
          />
          <label>전체 선택</label>
        </ListItem>
        
        {initialItems.map((item) => (
          <ListItem key={item.id}>
            <input 
              type="checkbox" 
              checked={checkedList.includes(item.id)}
              onChange={(e) => handleCheckSingle(e.target.checked, item.id)}
            />
            <label>{item.name}</label>
          </ListItem>
        ))}
      </ListContainer>

      <div style={{ marginTop: '20px' }}>
        <strong>선택된 항목 ID:</strong> {JSON.stringify(checkedList)}
      </div>
    </div>
  );
};

/*
[설명]
상태 배열(`checkedList`)을 이용해 체크박스 그룹을 제어하는 패턴입니다.

실무 패턴:
- 항목 개별 객체 안에 `isChecked` 속성을 추가해 뮤테이션하는 방식은 지양합니다.
- 대신 선택된 요소들의 **고유 식별자(ID)만 배열 상태로 관리**합니다. (`checkedList`)
- 전체 선택 여부는 파생 상태로 판단합니다 (`checkedList.length === 전체 아이템 수`);
- 이렇게 해야 나중에 "선택된 ID값만 모아서 백엔드에 전송"하기가 매우 수월해집니다.
*/
