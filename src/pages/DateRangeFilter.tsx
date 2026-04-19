import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

const reports = [
  { id: 1, title: '광고 집행 리포트', date: '2026-04-02' },
  { id: 2, title: '신규 가입 지표', date: '2026-04-06' },
  { id: 3, title: '환불 요청 현황', date: '2026-04-10' },
  { id: 4, title: '배송 지연 목록', date: '2026-04-14' },
  { id: 5, title: '결제 실패 모니터링', date: '2026-04-18' },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const FilterCard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: 600;

  input {
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ErrorBox = styled.div`
  padding: 14px 16px;
  border-radius: 10px;
  background-color: #fff1f0;
  color: #d14343;
  border: 1px solid #ffc9c5;
`;

const ListCard = styled.div`
  padding: 18px 20px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

export const DateRangeFilter: React.FC = () => {
  const [startDate, setStartDate] = useState('2026-04-05');
  const [endDate, setEndDate] = useState('2026-04-15');

  const hasError = Boolean(startDate && endDate && startDate > endDate);

  const filteredReports = useMemo(() => {
    if (hasError) {
      return [];
    }

    return reports.filter((report) => report.date >= startDate && report.date <= endDate);
  }, [endDate, hasError, startDate]);

  return (
    <Container>
      <div>
        <h2>기간 필터</h2>
        <p>조회 조건에서 자주 사용하는 시작일/종료일 검증과 범위 필터링 예제입니다.</p>
      </div>

      <FilterCard>
        <Field>
          시작일
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </Field>
        <Field>
          종료일
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </Field>
      </FilterCard>

      {hasError && (
        <ErrorBox>시작일은 종료일보다 늦을 수 없습니다. 기간 조건을 다시 확인해주세요.</ErrorBox>
      )}

      {filteredReports.map((report) => (
        <ListCard key={report.id}>
          <strong>{report.title}</strong>
          <span>{report.date}</span>
        </ListCard>
      ))}
    </Container>
  );
};

/*
[설명]
백오피스 조회 화면에서 날짜 범위 조건은 거의 빠지지 않습니다. 주문 조회, 정산 내역, 로그 검색, 가입 통계처럼 대부분의 데이터가 기간 조건과 함께 움직이기 때문입니다. 그런데 날짜 필터는 단순히 input 두 개를 두는 것으로 끝나지 않고, 시작일과 종료일의 관계를 검증하는 로직이 반드시 필요합니다. 이 예제는 그 기본 규칙을 가장 단순한 형태로 보여줍니다.

핵심은 `startDate > endDate` 같은 잘못된 조합을 미리 감지하는 것입니다. 날짜 문자열이 `YYYY-MM-DD` 형식이면 문자열 비교만으로도 순서를 판별할 수 있어서, 복잡한 Date 파싱 없이도 간단하게 검증할 수 있습니다. 실무에서는 이런 기본 검증을 UI 레벨에서 먼저 막아두면 불필요한 서버 요청을 줄일 수 있습니다.

필터 결과 계산은 `useMemo`로 분리했습니다. 날짜 범위가 바뀔 때만 결과를 다시 만들고, 에러 상태일 때는 바로 빈 배열을 반환해 잘못된 데이터 표시를 막습니다. 이런 방식은 조회 조건이 늘어나도 확장하기 편합니다. 예를 들어 상태값, 담당자, 키워드가 추가돼도 같은 블록 안에 조건을 계속 쌓아가면 됩니다.

실무 적용 팁은 아래와 같습니다.
- 초기 날짜는 보통 "최근 7일", "이번 달" 같은 프리셋과 함께 제공합니다.
- 서버 요청으로 바꿀 때도 잘못된 기간 조건은 프런트에서 먼저 막는 것이 UX와 비용 모두에 유리합니다.
- 타임존 이슈가 있는 프로젝트는 날짜만 다루는지, 날짜+시간까지 다루는지 기준을 초기에 명확히 해야 합니다.
*/
