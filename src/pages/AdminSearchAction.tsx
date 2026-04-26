import React from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 16px 20px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 300px;

  /* Input을 래핑하여 크기를 제어합니다 */
  .search-input {
    max-width: 350px;
    flex: 1;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Title = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  white-space: nowrap;
`;

export const AdminSearchAction: React.FC = () => {
  return (
    <SamplePageLayout
      title="검색바 + 액션 버튼 조합"
      icon="ri-search-eye-line"
      description="테이블 상단에 위치하여 좌측에는 검색, 우측에는 데이터 조작(추가, 다운로드 등) 액션을 배치하는 관리자 표준 헤더입니다."
      learningPoints={[
        'FlexBox의 justify-content: space-between을 활용한 양방향 정렬',
        '브라우저 폭이 줄어들 때 flex-wrap을 통한 자연스러운 세로 배치 처리',
        'Input과 Button 공통 컴포넌트 조합 시 간격(gap) 제어 기법',
      ]}
      whyImportant="어떤 B2B 소프트웨어든 이 레이아웃 패턴을 벗어나지 않습니다. 좌측에서 필터링하고 우측에서 액션(생성/엑셀다운로드 등)을 하는 것은 사용자의 눈에 가장 익숙한 멘탈 모델입니다."
    >
      {/* 
        실제로는 아래 HeaderContainer 밑에 Table이 렌더링 됩니다.
        여기서는 헤더 패턴만 보여줍니다.
      */}
      <HeaderContainer>
        <LeftSection>
          <Title>회원 목록 (1,240)</Title>
          <div className="search-input">
            <Input 
              placeholder="이름 또는 이메일 검색..." 
              icon="ri-search-line" 
              fullWidth={false}
            />
          </div>
        </LeftSection>

        <RightSection>
          <Button variant="outline" icon="ri-file-excel-2-line">
            엑셀 다운로드
          </Button>
          <Button variant="primary" icon="ri-user-add-line">
            신규 등록
          </Button>
        </RightSection>
      </HeaderContainer>

      <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px dashed #ccc' }}>
        (이 영역에 AdminUserManagement 테이블이 배치됩니다)
      </div>

    </SamplePageLayout>
  );
};

/*
[설명]
관리자 페이지의 목록(List) 뷰 상단에 거의 항상 위치하는 헤더 컨테이너 패턴입니다.

실무 패턴:
- 부모 컨테이너(`HeaderContainer`)에 `display: flex; justify-content: space-between;`을 적용하여 좌측 요소(타이틀, 검색)와 우측 요소(버튼)를 화면 양 끝으로 찢어놓습니다.
- 창 크기가 줄어들었을 때 레이아웃이 깨지지 않도록 `flex-wrap: wrap;`을 부여하고 자식 요소에 `min-width`를 지정하면, 좁은 화면에서는 버튼 그룹이 자연스럽게 검색바 밑으로 내려갑니다.
*/
