import React, { useState } from 'react';
import styled from 'styled-components';

const dummyUsers = [
  { id: 1, name: '김철수', role: 'Admin', status: 'Active' },
  { id: 2, name: '이영희', role: 'User', status: 'Active' },
  { id: 3, name: '홍길동', role: 'User', status: 'Inactive' },
  { id: 4, name: '박지민', role: 'Manager', status: 'Active' },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};

  th, td {
    padding: 12px 16px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    text-align: left;
  }

  th {
    background-color: ${({ theme }) => theme.colors.background};
    font-weight: 600;
  }

  tr:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const StatusBadge = styled.span<{ $isActive: boolean }>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  background-color: ${({ $isActive, theme }) => ($isActive ? theme.colors.success : theme.colors.error)}22;
  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.success : theme.colors.error)};
  font-weight: bold;
`;

export const UserList: React.FC = () => {
  const [users] = useState(dummyUsers);

  return (
    <Container>
      <h2>회원 목록 조회</h2>
      <p>배열 데이터를 map 함수를 이용해 테이블로 렌더링하는 가장 보편적인 패턴입니다.</p>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>권한</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>
                <StatusBadge $isActive={user.status === 'Active'}>
                  {user.status}
                </StatusBadge>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center' }}>데이터가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

/*
[설명]
배열을 리스트 형태로 출력하는 예제입니다.

실무 패턴:
- 배열을 화면에 그릴 때는 `array.map()`을 사용합니다.
- `key` prop을 고유한 값(id 등)으로 부여하는 것은 React 렌더링 최적화에 있어서 필수조건입니다. (index 사용은 지양)
- 조건부 렌더링 시 스타일드 컴포넌트를 활용하여 상태 텍스트에 따른 뱃지(Badge) 색상을 다르게 적용하는 패턴이 자주 쓰입니다 (`$isActive`).
*/
