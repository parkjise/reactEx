import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const createPage = (page: number) =>
  Array.from({ length: 6 }, (_, index) => ({
    id: page * 100 + index,
    title: `${page + 1}페이지 알림 카드 ${index + 1}`,
    body: '실시간 운영 로그와 피드성 데이터를 아래로 이어 붙이는 무한 스크롤 예제입니다.',
  }));

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FeedCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 18px 20px;

  h4 {
    margin: 0 0 8px;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.6;
  }
`;

const Sentinel = styled.div`
  padding: 18px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const InfiniteScrollFeed: React.FC = () => {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState(() => createPage(0));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) {
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !loading) {
        setPage((prev) => prev + 1);
      }
    }, { threshold: 0.8 });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loading, hasMore]);

  useEffect(() => {
    if (page === 0) {
      return;
    }

    setLoading(true);
    const timer = window.setTimeout(() => {
      const nextItems = createPage(page);
      setItems((prev) => [...prev, ...nextItems]);
      setLoading(false);

      if (page >= 3) {
        setHasMore(false);
      }
    }, 700);

    return () => window.clearTimeout(timer);
  }, [page]);

  return (
    <Container>
      <div>
        <h2>무한 스크롤 피드</h2>
        <p>목록 하단이 보일 때 다음 페이지를 이어서 붙이는 피드형 로딩 방식입니다.</p>
      </div>

      {items.map((item) => (
        <FeedCard key={item.id}>
          <h4>{item.title}</h4>
          <p>{item.body}</p>
        </FeedCard>
      ))}

      <Sentinel ref={sentinelRef}>
        {loading ? '다음 데이터를 불러오는 중...' : hasMore ? '아래로 스크롤하면 더 불러옵니다.' : '모든 데이터를 불러왔습니다.'}
      </Sentinel>
    </Container>
  );
};

/*
[설명]
무한 스크롤은 커뮤니티 피드, 알림 목록, 운영 로그처럼 사용자가 계속 아래로 읽어 내려가는 화면에서 자주 사용됩니다. 핵심은 스크롤 위치를 직접 계산하기보다, 하단 감시 요소(sentinel)가 화면에 들어왔는지를 기준으로 다음 페이지 요청을 트리거하는 것입니다. 이 예제는 `IntersectionObserver`를 이용해 그 구조를 단순하게 보여줍니다.

첫 번째 `useEffect`는 감시 대상 요소를 observer에 연결하는 역할만 담당합니다. 조건이 맞으면 `page`를 증가시키고, 실제 데이터 추가는 두 번째 `useEffect`에서 처리합니다. 이렇게 "언제 불러올지"와 "무엇을 불러올지"를 분리하면 코드 흐름이 훨씬 읽기 쉬워집니다. 실무에서도 이벤트 감지와 데이터 요청 로직을 분리하는 편이 유지보수에 유리합니다.

`items`는 이전 목록 뒤에 새 목록을 이어 붙이는 누적 구조입니다. 페이지네이션처럼 교체하지 않고 append 하는 방식이기 때문에, 상태 업데이트도 `setItems(prev => [...prev, ...nextItems])`처럼 이전 값을 기준으로 써야 안전합니다. 이 패턴은 비동기 요청이 섞일 때 특히 중요합니다.

실무에서 주의할 점은 아래와 같습니다.
- 중복 요청 방지를 위해 `loading` 플래그를 반드시 함께 봐야 합니다.
- 마지막 페이지에 도달했는지 알 수 있어야 계속 요청하는 문제를 막을 수 있습니다.
- 실제 API에서는 page 번호 대신 cursor 기반 무한 스크롤을 더 많이 쓰기도 합니다.
*/
