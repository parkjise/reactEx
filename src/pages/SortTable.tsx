import React, { useState, useMemo } from 'react';
import styled from 'styled-components';

const rawData = [
  { id: 1, name: 'Alice', age: 29, score: 85 },
  { id: 2, name: 'Bob', age: 34, score: 92 },
  { id: 3, name: 'Charlie', age: 22, score: 78 },
  { id: 4, name: 'David', age: 25, score: 95 },
  { id: 5, name: 'Eve', age: 30, score: 88 },
];

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};

  th {
    padding: 12px;
    background-color: ${({ theme }) => theme.colors.background};
    cursor: pointer;
    user-select: none;
    text-align: left;
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.border};
    }
  }

  td {
    padding: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

type SortKey = 'name' | 'age' | 'score';
type SortOrder = 'asc' | 'desc';

export const SortTable: React.FC = () => {
  const [sortKey, setSortKey] = useState<SortKey>('age');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedData = useMemo(() => {
    // Array.prototype.sort()는 원본 배열을 변경하므로 스프레드(...)로 복사 후 정렬합니다.
    return [...rawData].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [sortKey, sortOrder]);

  return (
    <div>
      <h2>다중 정렬 테이블</h2>
      <p>컬럼 헤더를 클릭하면 해당 기준으로 오름차순/내림차순 정렬됩니다.</p>
      <br/>

      <Table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>
              이름 {sortKey === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('age')}>
              나이 {sortKey === 'age' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('score')}>
              점수 {sortKey === 'score' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td>{row.score}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

/*
[설명]
테이블 컬럼 클릭 시 클라이언트 사이드에서 데이터를 정렬(Sorting)하는 패턴입니다.

실무 패턴:
- 정렬 기준(키)과 방향(오름차순, 내림차순)을 각각 상태로 관리합니다.
- sort() 메서드는 원본 배열을 뮤테이션(직접 변경)하므로, `[...rawData].sort()` 처럼 얕은 복사본을 만들어 정렬해야 리액트 불변성 법칙에 어긋나지 않습니다.
- 역시 데이터 포맷이 변경되는 것이므로 `useMemo`를 사용해 불필요한 반복 렌더링을 막습니다.
*/
