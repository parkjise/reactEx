import React, { useState } from 'react';
import styled from 'styled-components';

// 가상의 게시물 45개 데이터 생성
const generateDummyData = () => {
  return Array.from({ length: 45 }).map((_, i) => ({
    id: i + 1,
    title: `게시물 제목 테스트 ${i + 1}`,
    date: `2024-03-${String((i % 30) + 1).padStart(2, '0')}`
  }));
};

const dummyList = generateDummyData();

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};

  th, td {
    padding: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    text-align: left;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;

  button {
    padding: 8px 12px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    border-radius: 4px;
    transition: all 0.2s;

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    &.active {
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;
      border-color: ${({ theme }) => theme.colors.primary};
    }

    &:hover:not(:disabled):not(.active) {
      background-color: ${({ theme }) => theme.colors.background};
    }
  }
`;

export const PaginationSample: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(dummyList.length / itemsPerPage);

  // 현재 페이지에 해당하는 데이터만 배열 자르기 (slice 계산)
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = dummyList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <h2>클라이언트 사이드 페이지네이션</h2>
      <p>전체 데이터를 배열로 가지고 있을 때, `slice` 메서드를 사용해 리스트를 자르는 패턴입니다.</p>

      <Table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <PaginationWrapper>
        <button 
          onClick={() => setCurrentPage(prev => prev - 1)} 
          disabled={currentPage === 1}
        >
          <i className="ri-arrow-left-s-line"></i>
        </button>

        {/* 1부터 totalPages까지의 배열을 임의로 생성하여 map */}
        {Array.from({ length: totalPages }).map((_, i) => (
          <button 
            key={i} 
            className={currentPage === i + 1 ? 'active' : ''}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button 
          onClick={() => setCurrentPage(prev => prev + 1)} 
          disabled={currentPage === totalPages}
        >
          <i className="ri-arrow-right-s-line"></i>
        </button>
      </PaginationWrapper>
    </div>
  );
};

/*
[설명]
클라이언트단(프론트)에서 전체 데이터를 들고 있을 때 배열을 잘라 보여주는 기법입니다.

실무 패턴:
- API로 전체 리스트를 한 번에 받아왔거나 사내 어드민 기초 도구일 때 자주 씁니다.
- `itemsPerPage`(한 페이지당 개수)와 `currentPage`(현재 페이지) 상태를 곱해서 시작 `index`를 구합니다.
- (심화) 실무에서 데이터가 만 건, 십만 건이 넘어가면 백엔드에서 `limit`, `offset`을 받아 파라미터를 넘기는 '서버 사이드 페이지네이션' 형태를 취해야 합니다.
*/
