import React, { useState } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

const SearchContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-end;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 150px;

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

// Input wrapper to make it take available space
const StyledInputWrapper = styled.div`
  flex: 3;
  min-width: 200px;
`;

const ActionWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex: 1;
  min-width: 150px;
`;

export const SearchForm: React.FC = () => {
  const [searchType, setSearchType] = useState('name');
  const [keyword, setKeyword] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 업무에서는 이 시점에 URL 파라미터를 변경하거나 API를 호출합니다.
    alert(`검색 실행 - 분류: ${searchType}, 키워드: ${keyword || '전체'}`);
  };

  return (
    <SamplePageLayout
      title="검색 폼 (Search Form)"
      icon="ri-search-line"
      description="관리자 페이지나 목록 화면 상단에 위치하는 전형적인 테이블 검색 폼입니다."
      learningPoints={[
        'Select Box와 Input의 상태를 조합하여 검색 파라미터 생성',
        'Flex 레이아웃을 이용한 반응형(Responsive) 검색바 배치',
        '폼 제출(submit) 이벤트를 통한 검색 실행으로 엔터(Enter) 키 입력 자동 지원',
      ]}
      whyImportant="데이터 그리드(Table)와 항상 짝을 이루는 패턴입니다. 마우스로 검색 버튼을 클릭하지 않고도 인풋 창에서 엔터키를 쳤을 때 폼이 제출되도록 `<form>` 태그로 감싸는 것이 접근성과 사용성에 매우 중요합니다."
    >
      <SearchContainer>
        <Form onSubmit={handleSearch}>
          <SelectWrapper>
            <label>검색 분류</label>
            <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
              <option value="name">이름</option>
              <option value="email">이메일</option>
              <option value="phone">연락처</option>
              <option value="company">회사명</option>
            </select>
          </SelectWrapper>
          
          <StyledInputWrapper>
            <Input
              label="검색어"
              icon="ri-search-line"
              placeholder="검색어를 입력하세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              fullWidth
            />
          </StyledInputWrapper>

          <ActionWrapper>
            <Button type="submit" variant="primary" fullWidth icon="ri-search-line">
              조회
            </Button>
          </ActionWrapper>
        </Form>
      </SearchContainer>
    </SamplePageLayout>
  );
};

/*
[설명]
검색 조건을 입력받고 API를 호출하기 전 상태를 준비하는 폼입니다.

실무 패턴:
- `<div>`로 묶어서 `onKeyDown`을 통해 엔터키를 수동으로 잡아주는 것보다, 표준 `<form onSubmit={...}>`을 사용하는 것이 모바일 키보드의 '검색' 버튼까지 완벽하게 지원하는 정석입니다.
- 레이아웃은 `display: flex; flex-wrap: wrap;`을 적용하여 화면 폭이 줄어들 때 자연스럽게 밑으로 떨어지도록 구성합니다.
*/
