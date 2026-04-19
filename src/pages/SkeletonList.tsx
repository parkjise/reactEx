import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 20px;
`;

const SkeletonLine = styled.div<{ $width: string }>`
  height: 12px;
  width: ${({ $width }) => $width};
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.border};
  animation: ${pulse} 1.4s ease-in-out infinite;
  margin-bottom: 10px;
`;

const data = [
  { id: 1, title: '월간 운영 리포트', desc: '관리자 메인 대시보드에서 사용하는 핵심 리포트입니다.' },
  { id: 2, title: '정산 오류 알림', desc: '장애 대응팀이 우선 확인해야 하는 항목입니다.' },
  { id: 3, title: '광고 승인 대기', desc: '심사 대기 중인 광고 요청을 보여줍니다.' },
];

export const SkeletonList: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <Container>
      <div>
        <h2>스켈레톤 로딩 리스트</h2>
        <p>로딩 중에도 최종 레이아웃 자리를 먼저 보여줘서 화면 흔들림을 줄입니다.</p>
      </div>

      {loading ? (
        Array.from({ length: 3 }, (_, index) => (
          <Card key={index}>
            <SkeletonLine $width="42%" />
            <SkeletonLine $width="88%" />
            <SkeletonLine $width="74%" />
          </Card>
        ))
      ) : (
        data.map((item) => (
          <Card key={item.id}>
            <h4 style={{ marginTop: 0 }}>{item.title}</h4>
            <p style={{ marginBottom: 0, color: '#94A3B8' }}>{item.desc}</p>
          </Card>
        ))
      )}
    </Container>
  );
};

/*
[설명]
로딩 스피너만 중앙에 띄우는 방식은 구현은 쉽지만, 실제 콘텐츠가 어떤 모양으로 들어올지 사용자가 예측하기 어렵습니다. 특히 카드 목록, 댓글 리스트, 테이블처럼 레이아웃이 중요한 화면은 스켈레톤이 훨씬 좋은 UX를 제공합니다. 이 예제는 "최종 구조와 비슷한 틀"을 먼저 보여주고, 데이터가 오면 그 자리를 실제 내용으로 교체하는 패턴입니다.

스켈레톤의 장점은 단순히 예뻐 보여서가 아닙니다. 콘텐츠가 들어올 위치와 크기를 미리 확보하기 때문에, 로딩 완료 순간에 레이아웃이 크게 흔들리는 문제를 줄일 수 있습니다. 이런 안정감은 대시보드, 관리자 화면, 모바일 리스트처럼 반복 구조가 많은 화면에서 특히 중요합니다.

구현 포인트는 `loading`이 true일 때도 최종 카드 개수와 비슷한 뼈대를 먼저 렌더링한다는 점입니다. 사용자는 이미 3개의 카드가 들어올 것이라는 감각을 얻고, 실제 데이터가 들어와도 동일한 자리에 자연스럽게 채워진다고 느끼게 됩니다.

실무에서는 아래 원칙을 같이 챙기면 좋습니다.
- 스켈레톤 모양은 실제 콘텐츠 구조와 최대한 닮게 만드는 편이 좋습니다.
- 로딩 시간이 짧더라도 너무 빠르게 깜빡거리면 오히려 어색하므로 최소 표시 시간을 두기도 합니다.
- 테이블, 차트, 카드 등 컴포넌트별 스켈레톤을 재사용 컴포넌트로 분리하면 유지보수가 쉬워집니다.
*/
