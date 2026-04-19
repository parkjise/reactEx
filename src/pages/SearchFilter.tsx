import React, { useState, useMemo } from 'react';
import styled from 'styled-components';

const products = [
  { id: 1, name: '맥북 프로 16인치', category: '노트북', price: 3500000 },
  { id: 2, name: '아이폰 15 프로', category: '스마트폰', price: 1550000 },
  { id: 3, name: '에어팟 프로 2', category: '음향기기', price: 350000 },
  { id: 4, name: '갤럭시 S24 울트라', category: '스마트폰', price: 1690000 },
  { id: 5, name: 'LG 그램 16', category: '노트북', price: 1800000 },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 10px;
  
  input {
    flex: 1;
    max-width: 300px;
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
  }

  select {
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const SearchResult = styled.ul`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 10px 0;

  li {
    padding: 10px 20px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    display: flex;
    justify-content: space-between;

    &:last-child {
      border-bottom: none;
    }
  }
`;

export const SearchFilter: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('All');

  // useMemo를 사용하여 필터링된 배열을 계산합니다 (성능 최적화)
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchKeyword = p.name.toLowerCase().includes(keyword.toLowerCase());
      const matchCategory = category === 'All' ? true : p.category === category;
      return matchKeyword && matchCategory;
    });
  }, [keyword, category]);

  return (
    <Container>
      <h2>검색 / 필터</h2>
      <p>이 예제는 검색어 상태와 필터 상태에 따라 원본 데이터에서 계산된 값을 렌더링하는 패턴입니다.</p>

      <FilterBar>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">전체 카테고리</option>
          <option value="노트북">노트북</option>
          <option value="스마트폰">스마트폰</option>
          <option value="음향기기">음향기기</option>
        </select>
        <input 
          type="text" 
          value={keyword} 
          onChange={(e) => setKeyword(e.target.value)} 
          placeholder="상품명 검색..."
        />
      </FilterBar>

      <SearchResult>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(p => (
            <li key={p.id}>
              <span>[{p.category}] {p.name}</span>
              <span>{p.price.toLocaleString()} 원</span>
            </li>
          ))
        ) : (
          <li style={{ justifyContent: 'center' }}>검색 결과가 없습니다.</li>
        )}
      </SearchResult>

    </Container>
  );
};

/*
[설명]
클라이언트 사이드에서 검색 및 다중 조건 필터를 구현하는 방법입니다.

실무 패턴:
- 보통 실무에서 리스트 데이터가 있을 때, 원본 배열 자체를 수정(mutate)하지 않습니다.
- 필터 조건(검색어, 셀렉트박스 등)을 상태로 관리하고, 
- `array.filter()`를 사용하여 '파생된 상태(Derived State)'를 렌더링합니다.
- 복잡한 필터 연산의 경우 `useMemo`로 감싸주어 불필요한 재계산을 방지합니다.
*/
