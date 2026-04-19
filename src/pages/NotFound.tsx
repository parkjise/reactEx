import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
`;

const ErorrCode = styled.h1`
  font-size: 6rem;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const ErrorMsg = styled.h2`
  font-size: 1.5rem;
  margin: 10px 0 30px;
`;

const HomeButton = styled(Link)`
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 4px;
  font-weight: bold;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const NotFound: React.FC = () => {
  return (
    <Container>
      <ErorrCode>404</ErorrCode>
      <ErrorMsg>원하시는 페이지를 찾을 수 없습니다.</ErrorMsg>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        클릭하신 링크가 잘못되었거나, 페이지가 삭제되었을 수 있습니다.
      </p>
      
      <HomeButton to="/">
        대시보드로 돌아가기
      </HomeButton>
    </Container>
  );
};

/*
[설명]
잘못된 URL 라우트로 접근할 때 표시해주는 Fallback 페이지입니다.

실무 패턴:
- `react-router-dom`에서 모든 경로 매칭이 끝난 다음 라우트 스케치 속성에 `<Route path="*" element={<NotFound />} />` 와일드카드 별표 처리를 통해 어긋난 주소들을 전부 이곳으로 보냅니다.
*/
