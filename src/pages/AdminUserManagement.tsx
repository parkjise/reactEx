import React from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

const TableContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;

  th, td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  th {
    background-color: ${({ theme }) => theme.colors.background};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.85rem;
    white-space: nowrap;
  }

  td {
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.95rem;
  }

  tbody tr {
    transition: background-color 0.2s;
    &:hover {
      background-color: ${({ theme }) => theme.colors.background};
    }
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary}15;
    color: ${({ theme }) => theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
  }

  .info {
    display: flex;
    flex-direction: column;
    
    .name {
      font-weight: 600;
    }
    .email {
      font-size: 0.8rem;
      color: ${({ theme }) => theme.colors.textMuted};
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const AdminUserManagement: React.FC = () => {
  const users = [
    { id: 1, name: '김철수', email: 'chulsoo@example.com', role: '어드민', status: 'ACTIVE', lastLogin: '2026.10.24 14:30' },
    { id: 2, name: '이영희', email: 'younghee@example.com', role: '일반 회원', status: 'INACTIVE', lastLogin: '2026.08.12 09:15' },
    { id: 3, name: '박지민', email: 'jimin@example.com', role: '일반 회원', status: 'BANNED', lastLogin: '2026.10.01 18:45' },
  ];

  return (
    <SamplePageLayout
      title="사용자 관리 테이블"
      icon="ri-group-line"
      description="회원 목록 조회, 권한 확인, 계정 상태 변경 등을 수행하는 전형적인 관리자 테이블입니다."
      learningPoints={[
        '공통 Badge 컴포넌트를 활용한 직관적인 상태(활성/정지 등) 표기',
        '행(Row)별 개별 액션 버튼(수정, 차단) 배치 및 CSS Hover 효과',
        '프로필 이미지(Avatar)와 텍스트(이름, 이메일)를 깔끔하게 정렬하는 레이아웃 기법',
      ]}
      whyImportant="백오피스 시스템의 80%는 테이블(Data Grid)로 이루어져 있습니다. 데이터의 성격(상태, 날짜, 버튼 등)에 따라 적절한 UI 컴포넌트를 매핑하여 가독성을 높이는 것이 핵심입니다."
    >
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <th>사용자 정보</th>
              <th>권한</th>
              <th>상태</th>
              <th>최근 접속일</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <UserProfile>
                    <div className="avatar">{user.name.charAt(0)}</div>
                    <div className="info">
                      <span className="name">{user.name}</span>
                      <span className="email">{user.email}</span>
                    </div>
                  </UserProfile>
                </td>
                <td>{user.role}</td>
                <td>
                  {user.status === 'ACTIVE' && <Badge status="success">활성</Badge>}
                  {user.status === 'INACTIVE' && <Badge status="default">휴면</Badge>}
                  {user.status === 'BANNED' && <Badge status="error">정지</Badge>}
                </td>
                <td>{user.lastLogin}</td>
                <td>
                  <ActionButtons>
                    <Button variant="outline" size="small">수정</Button>
                    <Button variant="ghost" size="small" style={{ color: '#EE5D50' }}>차단</Button>
                  </ActionButtons>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </SamplePageLayout>
  );
};

/*
[설명]
관리자 페이지에서 가장 많이 쓰이는 목록 조회형 테이블 UI입니다.

실무 패턴:
- 일반 텍스트 대신 `Badge` 컴포넌트를 사용하여 사용자의 '상태(Status)'를 한눈에 식별할 수 있게 돕습니다.
- 프로필 컬럼의 경우 이름과 이메일을 상하로 배치(`flex-direction: column`)하고, 좌측에 아바타 원형 이미지를 두어 복합적인 정보를 효율적으로 보여줍니다.
- 모바일 환경 등 화면이 좁아질 때 테이블이 깨지지 않도록 `<TableContainer>`에 `overflow-x: auto;`를 주어 가로 스크롤을 유도합니다.
*/
