import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

const products = [
  { id: 1, name: 'Admin Dashboard Template', team: 'Design System', updatedAt: '10분 전' },
  { id: 2, name: 'Revenue Insight Report', team: 'Data Platform', updatedAt: '22분 전' },
  { id: 3, name: 'Order Fulfillment Queue', team: 'Commerce Ops', updatedAt: '35분 전' },
  { id: 4, name: 'Promotion Approval Center', team: 'Marketing', updatedAt: '1시간 전' },
  { id: 5, name: 'Customer Health Summary', team: 'CS', updatedAt: '2시간 전' },
  { id: 6, name: 'Settlement Export Batch', team: 'Finance', updatedAt: '오늘' },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SearchCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 24px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const StatusRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
`;

const ResultCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};

  strong {
    display: block;
    margin-bottom: 6px;
    color: ${({ theme }) => theme.colors.text};
  }

  span {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.88rem;
  }
`;

const EmptyBox = styled.div`
  padding: 32px;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const DebouncedSearch: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedKeyword(keyword.trim().toLowerCase());
      setRequestCount((prev) => prev + 1);
    }, 400);

    return () => window.clearTimeout(timer);
  }, [keyword]);

  const filteredProducts = useMemo(() => {
    if (!debouncedKeyword) {
      return products;
    }

    return products.filter((product) => {
      const combinedText = `${product.name} ${product.team}`.toLowerCase();
      return combinedText.includes(debouncedKeyword);
    });
  }, [debouncedKeyword]);

  return (
    <Container>
      <div>
        <h2>디바운스 검색</h2>
        <p>검색어가 멈춘 뒤에만 조회를 수행해서 서버 호출 횟수를 줄이는 실무 패턴입니다.</p>
      </div>

      <SearchCard>
        <SearchInput
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="프로젝트 이름이나 팀명을 입력하세요"
        />
      </SearchCard>

      <StatusRow>
        <span>현재 입력값: {keyword || '없음'}</span>
        <span>실제 조회값: {debouncedKeyword || '전체'}</span>
        <span>조회 실행 횟수: {requestCount}회</span>
      </StatusRow>

      {filteredProducts.length === 0 ? (
        <EmptyBox>조건에 맞는 결과가 없습니다.</EmptyBox>
      ) : (
        filteredProducts.map((product) => (
          <ResultCard key={product.id}>
            <div>
              <strong>{product.name}</strong>
              <span>{product.team}</span>
            </div>
            <span>{product.updatedAt}</span>
          </ResultCard>
        ))
      )}
    </Container>
  );
};

/*
[설명]
이 예제의 핵심은 사용자가 키를 누를 때마다 바로 검색하지 않고, 입력이 잠깐 멈췄을 때만 실제 조회 로직을 실행한다는 점입니다. 실무에서 검색창은 보통 API 호출과 붙어 있기 때문에, 타이핑 한 글자마다 요청을 보내면 서버 비용이 늘고 화면도 불안정해집니다. 그래서 입력 상태(`keyword`)와 실제 검색 상태(`debouncedKeyword`)를 분리하는 패턴을 매우 자주 사용합니다.

`useEffect` 안에서 `setTimeout`을 만들고, 사용자가 다시 타이핑하면 cleanup에서 이전 타이머를 지워버립니다. 이 구조 덕분에 마지막 입력만 살아남고 중간 입력은 모두 취소됩니다. 즉 "a", "ab", "abc"를 빠르게 쳤을 때 실제 검색은 "abc" 한 번만 실행되는 식입니다. 이런 형태는 검색창뿐 아니라 자동 저장, 필터 패널, 리사이즈 이벤트 처리에도 그대로 재사용됩니다.

`useMemo`를 붙인 이유도 실무적입니다. 여기서는 로컬 배열 필터링이지만, 실제 프로젝트에서는 검색 결과를 가공하거나 정렬 조건을 섞는 경우가 많습니다. 그럴 때 실제 조회 기준인 `debouncedKeyword`가 바뀔 때만 계산을 다시 수행하면 의도를 더 분명하게 드러낼 수 있습니다.

실무에서 꼭 기억할 포인트는 세 가지입니다.
- 사용자가 보고 있는 입력값과 서버에 보낼 조회값은 분리해 두는 편이 안전합니다.
- 디바운스 지연 시간은 보통 300ms~500ms 사이에서 결정하며, 너무 길면 답답하고 너무 짧으면 효과가 약해집니다.
- 나중에 API 연동으로 바꿀 때는 `debouncedKeyword`를 의존값으로 사용해서 요청을 보내면 구조를 거의 그대로 유지할 수 있습니다.
*/
