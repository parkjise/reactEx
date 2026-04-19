import React, { useState } from 'react';
import styled from 'styled-components';

const initialRequests = [
  { id: 1, title: '프로모션 예산 증액', requester: '마케팅팀', status: '검토중' },
  { id: 2, title: '신규 파트너 정산 계정 생성', requester: '재무팀', status: '대기' },
  { id: 3, title: '운영자 권한 승격', requester: 'CS팀', status: '승인 완료' },
];

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(280px, 1fr);
  gap: 20px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 22px;
`;

const RequestItem = styled.button<{ $active: boolean }>`
  width: 100%;
  text-align: left;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ theme, $active }) => ($active ? `${theme.colors.primary}10` : theme.colors.background)};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
`;

const Status = styled.span`
  display: inline-flex;
  margin-top: 8px;
  padding: 5px 10px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.primary}12;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.82rem;
  font-weight: 700;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid ${({ theme, $primary }) => ($primary ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ theme, $primary }) => ($primary ? theme.colors.primary : theme.colors.surface)};
  color: ${({ theme, $primary }) => ($primary ? '#fff' : theme.colors.text)};
  font-weight: 700;
`;

export const ApprovalWorkflow: React.FC = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [selectedId, setSelectedId] = useState(initialRequests[0].id);

  const selectedRequest = requests.find((request) => request.id === selectedId) ?? requests[0];

  const updateStatus = (status: string) => {
    setRequests((prev) => prev.map((request) => (
      request.id === selectedId ? { ...request, status } : request
    )));
  };

  return (
    <div>
      <h2>승인 워크플로우</h2>
      <p style={{ marginBottom: '18px' }}>대기, 검토, 승인 같은 운영 상태 전환을 한 화면에서 다루는 예제입니다.</p>

      <Container>
        <Card>
          {requests.map((request) => (
            <RequestItem
              key={request.id}
              $active={request.id === selectedId}
              onClick={() => setSelectedId(request.id)}
            >
              <strong>{request.title}</strong>
              <div style={{ marginTop: '6px', color: '#94A3B8' }}>{request.requester}</div>
              <Status>{request.status}</Status>
            </RequestItem>
          ))}
        </Card>

        <Card>
          <h3 style={{ marginTop: 0 }}>{selectedRequest.title}</h3>
          <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>
            현재 선택한 요청에 대해 상태를 전환할 수 있습니다. 실제 운영툴에서는 이 영역에 신청 사유, 첨부 파일, 승인 이력, 코멘트가 함께 배치됩니다.
          </p>

          <div><strong>요청 부서:</strong> {selectedRequest.requester}</div>
          <div style={{ marginTop: '8px' }}><strong>현재 상태:</strong> {selectedRequest.status}</div>

          <ActionRow>
            <Button onClick={() => updateStatus('보류')}>보류</Button>
            <Button onClick={() => updateStatus('검토중')}>검토중</Button>
            <Button $primary onClick={() => updateStatus('승인 완료')}>승인</Button>
          </ActionRow>
        </Card>
      </Container>
    </div>
  );
};

/*
[설명]
승인 워크플로우는 권한 관리, 정산 승인, 광고 심사, 문서 결재처럼 운영성 서비스에서 매우 흔한 화면입니다. 공통점은 "하나의 요청이 여러 상태를 거친다"는 점이며, 사용자는 현재 상태와 다음에 가능한 액션을 명확히 알아야 합니다. 이 예제는 목록과 상세 패널을 나눠 그 흐름을 단순화해 보여줍니다.

좌측 목록은 전체 요청을 빠르게 훑는 역할, 우측 상세 패널은 선택한 요청의 세부 정보와 액션을 제공하는 역할을 담당합니다. 이런 2단 구조는 운영툴에서 특히 자주 쓰이며, 사용자가 목록과 상세를 왔다 갔다 하지 않아도 되기 때문에 업무 속도가 빨라집니다.

상태 전환은 `selectedId`를 기준으로 현재 선택된 항목 하나만 업데이트합니다. 이때도 직접 객체를 수정하지 않고, `map`으로 새 배열을 만들어 해당 항목만 교체합니다. 상태 전환 이력이 붙거나 API 연동이 들어가도 기본 구조는 그대로 유지됩니다.

실무에서 보통 다음 요소들이 더 추가됩니다.
- 상태별로 가능한 버튼을 제한하는 정책
- 승인/반려 사유 입력과 이력 타임라인
- 권한에 따라 버튼 노출을 다르게 하는 접근 제어
*/
