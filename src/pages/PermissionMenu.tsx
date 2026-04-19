import React, { useState } from 'react';
import styled from 'styled-components';

const RoleSelect = styled.div`
  margin: 20px 0;
  display: flex;
  gap: 10px;

  button {
    padding: 8px 16px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.primary};
    
    &.active {
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;
    }
  }
`;

const ContentBox = styled.div`
  padding: 30px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  text-align: center;
`;

type RoleType = 'GUEST' | 'USER' | 'ADMIN';

export const PermissionMenu: React.FC = () => {
  const [userRole, setUserRole] = useState<RoleType>('GUEST');

  return (
    <div>
      <h2>권한별 메뉴 렌더링 처리</h2>
      <p>로그인한 사용자의 등급(Role)에 따라 보여지는 화면이나 버튼이 달라지는 패턴입니다.</p>

      <RoleSelect>
        <button 
          className={userRole === 'GUEST' ? 'active' : ''} 
          onClick={() => setUserRole('GUEST')}
        >
          비회원 모의로그인
        </button>
        <button 
          className={userRole === 'USER' ? 'active' : ''} 
          onClick={() => setUserRole('USER')}
        >
          일반유저 모의로그인
        </button>
        <button 
          className={userRole === 'ADMIN' ? 'active' : ''} 
          onClick={() => setUserRole('ADMIN')}
        >
          관리자 모의로그인
        </button>
      </RoleSelect>

      <ContentBox>
        <h3 style={{ marginBottom: '20px' }}>
          당신의 현재 권한은 <strong style={{ color: '#f44336' }}>{userRole}</strong> 입니다.
        </h3>

        {/* 조건부 렌더링 체인 */}
        {userRole === 'GUEST' && (
          <p>비회원은 읽기만 가능합니다. 로그인해주세요.</p>
        )}

        {(userRole === 'USER' || userRole === 'ADMIN') && (
          <button style={{ padding: '10px 20px', background: '#3f51b5', color: '#fff' }}>
            글쓰기 버튼 (일반유저 기능)
          </button>
        )}

        {userRole === 'ADMIN' && (
          <button style={{ padding: '10px 20px', background: '#f44336', color: '#fff', marginLeft: '10px' }}>
            서버 설정 변경 (관리자 전용)
          </button>
        )}
      </ContentBox>
    </div>
  );
};

/*
[설명]
RBAC(Role-Based Access Control) 권한기반 렌더링 프론트엔드 패턴입니다.

실무 패턴:
- 컴포넌트 단계에서 `{ role === 'ADMIN' && <AdminButton/> }` 처럼 간단한 논리연산자(`&&`)로 숨김처리를 합니다.
- (심화 적용) 물론 프론트엔드에서 버튼을 숨겼다고 완벽히 막히는 것이 아니므로, **가장 중요한 보안 검증(해당 API 권한 유무 확인)은 반드시 백엔드(서버)에서 수행**되어야 합니다.
- 프론트엔드에서의 이런 처리는 악의적 공격 방어가 아닌 단순한 '사용성 향상(UX)' 에 불과하다는 점을 인지해야 합니다.
*/
