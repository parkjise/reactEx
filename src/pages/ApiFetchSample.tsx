import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 20px;
`;

const PostCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 15px;

  h4 { margin: 0 0 10px 0; color: ${({ theme }) => theme.colors.primary}; }
  p { margin: 0; color: ${({ theme }) => theme.colors.text}; }
`;

const LoadingSpinner = styled.div`
  padding: 40px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1.2rem;
  
  i {
    animation: spin 1s linear infinite;
    display: inline-block;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ErrorBox = styled.div`
  padding: 20px;
  background-color: #fee;
  color: #c62828;
  border: 1px solid #c62828;
  border-radius: 8px;
`;

interface Post {
  id: number;
  title: string;
  body: string;
}

export const ApiFetchSample: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // 강제 1초 딜레이(UX 테스트용)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
      if (!response.ok) throw new Error('API 호출에 실패했습니다.');
      
      const data = await response.json();
      setPosts(data);
    } catch (err: any) {
      setError(err.message || '알 수 없는 에러가 발생했습니다.');
    } finally {
      // 성공하든 실패하든 로딩은 무조건 꺼줍니다.
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // 마운트 시 최초 1회 실행

  return (
    <Container>
      <h2>API 비동기 통신 (Loading & Error 상태 관리)</h2>
      <p>외부 서버에서 데이터를 불러오는 동안의 로딩 처리, 그리고 에러 처리 패턴입니다.</p>

      <button onClick={fetchData} style={{ padding: '8px 12px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}>
        <i className="ri-refresh-line" /> 데이터 다시 불러오기
      </button>

      {/* 3가지 상태(loading, error, success)에 따른 조건부 렌더링 */}
      {loading ? (
        <LoadingSpinner>
          <i className="ri-loader-4-line" /> 데이터를 불러오는 중입니다...
        </LoadingSpinner>
      ) : error ? (
        <ErrorBox>
          <i className="ri-error-warning-line" /> {error}
        </ErrorBox>
      ) : (
        <div>
          {posts.map(post => (
            <PostCard key={post.id}>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </PostCard>
          ))}
        </div>
      )}
    </Container>
  );
};

/*
[설명]
API 호출 시 반드시 고려해야 하는 Data, Loading, Error 3종 세트 상태 디자인 패턴입니다.

실무 패턴:
- `fetch`나 `axios` 호출은 비동기로 일어나므로 `try...catch...finally` 블록으로 감싸서 에러 방어를 반드시 해주어야 합니다.
- `finally` 구문을 활용하여 통신이 성공하든 실패하든 간에 로딩 스피너를 무조건 제거해주어야 무한 로딩에 빠지지 않습니다.
- (심화 적용) 최신 실무에서는 이런 상태관리를 직접 작성하기보다 `React Query` 내지 `SWR` 이라는 데이터 패칭 전문 라이브러리로 위임하는 것이 대세입니다.
*/
