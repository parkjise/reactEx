// src/pages/styled/StyledBadgeSample.tsx
import React from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { StyledBadge } from '../../components/styled/StyledBadge';
import { CodeViewer } from '../../components/CodeViewer';

const Row = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  align-items: center;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

export const StyledBadgeSample: React.FC = () => {
  const codeString = `<StyledBadge variant="default">대기중</StyledBadge>
<StyledBadge variant="primary">진행중</StyledBadge>
<StyledBadge variant="success">완료됨</StyledBadge>
<StyledBadge variant="error">실패</StyledBadge>
<StyledBadge variant="warning">주의</StyledBadge>

{/* 둥근 형태 (Pill) */}
<StyledBadge variant="primary" pill>New</StyledBadge>`;

  return (
    <SamplePageLayout
      title="12. Badge / Status UI"
      description="상태값(진행중, 완료 등)이나 태그를 직관적으로 표시하기 위한 뱃지 컴포넌트입니다. CSS 투명도(rgba)를 활용해 세련된 배경색을 만듭니다."
    >
      <StyledCard>
        <h3>1. 네모난 뱃지 (기본)</h3>
        <Row>
          <StyledBadge variant="default">대기중</StyledBadge>
          <StyledBadge variant="primary">진행중</StyledBadge>
          <StyledBadge variant="success">완료됨</StyledBadge>
          <StyledBadge variant="warning">승인 대기</StyledBadge>
          <StyledBadge variant="error">결제 실패</StyledBadge>
        </Row>

        <h3>2. 둥근 뱃지 (Pill)</h3>
        <Row>
          <StyledBadge variant="primary" pill>New</StyledBadge>
          <StyledBadge variant="error" pill>99+</StyledBadge>
          <StyledBadge variant="success" pill>Beta</StyledBadge>
        </Row>

        <h3>3. 실무 리스트 예시</h3>
        <div style={{ maxWidth: '400px', marginBottom: '30px' }}>
          <ListItem>
            <span>아이폰 15 프로 주문</span>
            <StyledBadge variant="success">배송완료</StyledBadge>
          </ListItem>
          <ListItem>
            <span>맥북 프로 M3 주문</span>
            <StyledBadge variant="primary">배송중</StyledBadge>
          </ListItem>
          <ListItem>
            <span>매직 키보드 환불</span>
            <StyledBadge variant="warning">처리대기</StyledBadge>
          </ListItem>
        </div>

        <CodeViewer rawCode={codeString} language="tsx" filename="Badge Usage" />
      </StyledCard>
    </SamplePageLayout>
  );
};
