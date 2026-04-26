import React, { useState } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

const FilterContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const SelectGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 0.9rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }

  select {
    width: 100%;
    padding: 12px;
    background-color: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.95rem;
    outline: none;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}20`};
    }
  }
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 10px;
  padding-top: 20px;
  border-top: 1px dashed ${({ theme }) => theme.colors.border};
`;

// 초기 상태를 컴포넌트 외부에 상수로 정의하여 언제든 쉽게 복원할 수 있도록 합니다.
const INITIAL_FILTER_STATE = {
  keyword: '',
  status: 'ALL',
  startDate: '',
  endDate: '',
};

export const FilterReset: React.FC = () => {
  const [filters, setFilters] = useState(INITIAL_FILTER_STATE);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    // 깊은 복사나 새로운 객체 할당을 통해 초기 상태로 한 번에 덮어씁니다.
    setFilters({ ...INITIAL_FILTER_STATE });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`필터 적용: ${JSON.stringify(filters, null, 2)}`);
  };

  // 필터가 하나라도 초기 상태와 다르면 초기화 버튼을 활성화합니다.
  const isDirty = JSON.stringify(filters) !== JSON.stringify(INITIAL_FILTER_STATE);

  return (
    <SamplePageLayout
      title="복합 필터 및 초기화 (Filter Reset)"
      icon="ri-filter-clear-line"
      description="다수의 검색 조건을 하나의 객체로 관리하고, 클릭 한 번에 모든 조건을 초기 상태로 되돌리는 패턴입니다."
      learningPoints={[
        '초기 상태(Initial State)를 상수로 분리하여 관리',
        '개별 속성을 일일이 지우지 않고 객체 덮어쓰기로 한 번에 초기화',
        '현재 상태와 초기 상태를 비교하여 "초기화" 버튼의 활성화/비활성화(disabled) 동적 제어',
      ]}
      whyImportant="사용자가 이것저것 검색 조건을 설정하다가 다시 처음 상태로 돌아가고 싶어할 때, 일일이 지우게 만드는 것은 매우 불편합니다. 명확한 '초기화' 버튼 제공은 고급 어드민 페이지의 필수 요구사항입니다."
    >
      <FilterContainer>
        <Form onSubmit={handleSearch}>
          <FilterGrid>
            <Input
              label="검색어"
              name="keyword"
              icon="ri-search-line"
              placeholder="이름, 이메일 등"
              value={filters.keyword}
              onChange={handleChange}
            />
            
            <SelectGroup>
              <label>계정 상태</label>
              <select name="status" value={filters.status} onChange={handleChange}>
                <option value="ALL">전체</option>
                <option value="ACTIVE">활성</option>
                <option value="INACTIVE">휴면</option>
                <option value="BANNED">정지</option>
              </select>
            </SelectGroup>

            <Input
              label="가입일 시작"
              name="startDate"
              type="date"
              value={filters.startDate}
              onChange={handleChange}
            />
            
            <Input
              label="가입일 종료"
              name="endDate"
              type="date"
              value={filters.endDate}
              onChange={handleChange}
            />
          </FilterGrid>

          <ActionRow>
            <Button 
              type="button" 
              variant="outline" 
              icon="ri-refresh-line" 
              onClick={handleReset}
              disabled={!isDirty}
            >
              필터 초기화
            </Button>
            <Button type="submit" variant="primary" icon="ri-filter-3-line">
              필터 적용
            </Button>
          </ActionRow>
        </Form>
      </FilterContainer>
    </SamplePageLayout>
  );
};

/*
[설명]
검색어, 상태, 날짜 등 복합적인 필터를 상태로 묶어두고 리셋하는 패턴입니다.

실무 패턴:
- 컴포넌트 외부에 `INITIAL_FILTER_STATE` 상수를 정의합니다.
- `handleReset` 함수에서 `setFilters(INITIAL_FILTER_STATE)`를 호출해 모든 상태를 단숨에 원복시킵니다.
- `JSON.stringify` 또는 lodash의 `isEqual`을 사용해 현재 상태가 초기 상태와 같은지 비교하고, 같다면 초기화 버튼을 `disabled` 처리하여 시각적인 힌트를 줍니다.
*/
