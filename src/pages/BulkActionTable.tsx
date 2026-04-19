import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

const initialRows = [
  { id: 101, name: '정산 지연 문의', owner: '김민수', status: '대기' },
  { id: 102, name: '환불 승인 요청', owner: '이수진', status: '대기' },
  { id: 103, name: '배너 교체 작업', owner: '박지훈', status: '진행중' },
  { id: 104, name: '정책 변경 검토', owner: '최은지', status: '검토중' },
  { id: 105, name: '파트너 계약 확인', owner: '한도윤', status: '대기' },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button<{ $primary?: boolean }>`
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid ${({ theme, $primary }) => ($primary ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ theme, $primary }) => ($primary ? theme.colors.primary : theme.colors.surface)};
  color: ${({ theme, $primary }) => ($primary ? '#fff' : theme.colors.text)};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  overflow: hidden;

  th, td {
    padding: 14px 16px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    text-align: left;
  }

  th {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.primary}12;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.84rem;
  font-weight: 700;
`;

export const BulkActionTable: React.FC = () => {
  const [rows, setRows] = useState(initialRows);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const allSelected = rows.length > 0 && selectedIds.length === rows.length;

  const selectedRows = useMemo(
    () => rows.filter((row) => selectedIds.includes(row.id)),
    [rows, selectedIds],
  );

  const toggleAll = () => {
    setSelectedIds(allSelected ? [] : rows.map((row) => row.id));
  };

  const toggleRow = (id: number) => {
    setSelectedIds((prev) => (
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    ));
  };

  const updateSelectedStatus = (status: string) => {
    setRows((prev) => prev.map((row) => (
      selectedIds.includes(row.id) ? { ...row, status } : row
    )));
    setSelectedIds([]);
  };

  return (
    <Container>
      <div>
        <h2>일괄 처리 테이블</h2>
        <p>백오피스에서 자주 쓰는 선택 행 일괄 승인/보류 패턴입니다.</p>
      </div>

      <Toolbar>
        <div>
          <strong>{selectedIds.length}건 선택됨</strong>
          <div style={{ color: '#94A3B8', marginTop: '6px' }}>
            선택된 항목: {selectedRows.map((row) => row.name).join(', ') || '없음'}
          </div>
        </div>
        <ButtonGroup>
          <ActionButton onClick={() => updateSelectedStatus('승인 완료')} disabled={selectedIds.length === 0}>
            일괄 승인
          </ActionButton>
          <ActionButton onClick={() => updateSelectedStatus('보류')} disabled={selectedIds.length === 0}>
            보류 처리
          </ActionButton>
          <ActionButton $primary onClick={() => updateSelectedStatus('재검토')} disabled={selectedIds.length === 0}>
            재검토 요청
          </ActionButton>
        </ButtonGroup>
      </Toolbar>

      <Table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" checked={allSelected} onChange={toggleAll} />
            </th>
            <th>업무명</th>
            <th>담당자</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(row.id)}
                  onChange={() => toggleRow(row.id)}
                />
              </td>
              <td>{row.name}</td>
              <td>{row.owner}</td>
              <td>
                <StatusBadge>{row.status}</StatusBadge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

/*
[설명]
실무용 테이블은 단순 조회만으로 끝나지 않고, 여러 행을 동시에 선택한 뒤 같은 액션을 한 번에 적용하는 요구가 매우 자주 나옵니다. 운영툴에서 승인, 삭제, 상태 변경, 담당자 지정 같은 액션이 대표적입니다. 그래서 이 예제는 `rows`와 `selectedIds`를 분리해서 관리하는 기본 설계를 보여줍니다.

선택 상태를 객체 전체가 아니라 `id` 배열로 들고 가는 이유는 명확합니다. 데이터 원본은 서버 재조회나 정렬 변경으로 순서가 바뀔 수 있는데, 선택 상태를 독립적으로 유지하면 화면 구조가 바뀌어도 어떤 항목을 선택했는지 안정적으로 추적할 수 있습니다. 이 패턴은 페이지네이션, 서버 정렬, 무한 스크롤과 결합될 때 특히 중요합니다.

상단 툴바는 선택된 개수와 가능한 액션을 함께 보여줍니다. 사용자가 무엇을 선택했는지 즉시 이해하게 만들고, 동시에 선택이 없을 때 버튼을 비활성화해서 잘못된 액션을 막습니다. 이런 작은 UX가 실제 운영툴에서는 사고를 줄이는 핵심 장치가 됩니다.

실무에서 확장할 때는 아래 포인트를 같이 챙기면 좋습니다.
- 현재 페이지 전체 선택인지, 검색 결과 전체 선택인지 정책을 분명히 구분해야 합니다.
- 서버에 일괄 요청을 보낸 뒤에는 성공/실패 행을 분리해서 보여주는 후속 UX가 필요합니다.
- 선택 상태는 가능하면 고유 ID 기준으로 관리하고, 화면 index에 의존하지 않는 편이 유지보수에 유리합니다.
*/
