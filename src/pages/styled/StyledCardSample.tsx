// src/pages/styled/StyledCardSample.tsx
import React from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { StyledButton } from '../../components/styled/StyledButton';
import { CodeViewer } from '../../components/CodeViewer';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const ProfileImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
`;

export const StyledCardSample: React.FC = () => {
  const codeString = `/* [설명]
StyledCard는 대시보드, 프로필, 설정 패널처럼 정보를 하나의 표면으로 묶는 공통 컨테이너입니다.
padding, shadow 같은 반복 스타일을 props로 제어하면 카드마다 여백과 깊이가 제각각 달라지는 문제를 줄일 수 있습니다.
*/
<StyledCard padding="30px">
  <ProfileImage>A</ProfileImage>
  <h3>Admin User</h3>
  <p>시스템 관리 권한을 가진 유저입니다.</p>
  <StyledButton fullWidth>권한 설정</StyledButton>
</StyledCard>

<StyledCard noShadow padding="20px">
  <p>그림자가 없고 테두리만 있는 카드</p>
</StyledCard>`;

  return (
    <SamplePageLayout
      title="9. Card UI 컴포넌트"
      description="가장 많이 쓰이는 Card UI 컴포넌트입니다. 패딩(padding)과 그림자(shadow)를 props로 제어할 수 있습니다."
    >
      <Grid>
        <StyledCard padding="30px">
          <ProfileImage>A</ProfileImage>
          <h3 style={{ marginBottom: '8px' }}>Admin User</h3>
          <p style={{ color: 'var(--textMuted)', marginBottom: '20px' }}>
            시스템 전체 관리 권한을 가진 유저입니다.
          </p>
          <StyledButton fullWidth>권한 설정하기</StyledButton>
        </StyledCard>

        <StyledCard padding="30px">
          <ProfileImage style={{ backgroundColor: 'var(--success)' }}>E</ProfileImage>
          <h3 style={{ marginBottom: '8px' }}>Editor</h3>
          <p style={{ color: 'var(--textMuted)', marginBottom: '20px' }}>
            콘텐츠 작성 및 수정 권한을 가진 유저입니다.
          </p>
          <StyledButton fullWidth variant="outline">글쓰기 권한</StyledButton>
        </StyledCard>

        <StyledCard noShadow padding="30px" style={{ backgroundColor: 'var(--background)' }}>
          <ProfileImage style={{ backgroundColor: 'var(--textMuted)' }}>G</ProfileImage>
          <h3 style={{ marginBottom: '8px' }}>Guest User</h3>
          <p style={{ color: 'var(--textMuted)', marginBottom: '20px' }}>
            읽기 권한만 있는 임시 유저입니다. (그림자 없음)
          </p>
          <StyledButton fullWidth variant="ghost" disabled>권한 없음</StyledButton>
        </StyledCard>
      </Grid>

      <StyledCard>
        <CodeViewer rawCode={codeString} language="tsx" filename="Card Usage" />
      </StyledCard>
    </SamplePageLayout>
  );
};
