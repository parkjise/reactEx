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
  const componentCode = `/* [설명]
StyledBadge는 주문 상태, 승인 상태, 알림 수, 태그처럼 짧은 상태값을 일관된 UI로 보여주는 공통 컴포넌트입니다.

- variant 타입을 union으로 제한해서 primary, success, error, warning, default 외의 값을 사용할 수 없게 합니다.
- variantStyles 객체에 색상별 스타일을 모아두면 상태가 늘어날 때 한 곳만 수정하면 됩니다.
- pill prop은 둥근 배지와 기본 사각 배지를 같은 컴포넌트에서 제어하기 위한 boolean 옵션입니다.
- 실무에서는 주문 상태, 사용자 권한, 결제 상태, 게시글 공개 상태처럼 반복되는 상태 라벨에 재사용합니다.
*/
// src/components/styled/StyledBadge.tsx
import React from 'react';
import styled, { css } from 'styled-components';

export type BadgeVariant = 'primary' | 'success' | 'error' | 'warning' | 'default';

interface StyledBadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  pill?: boolean;
}

const variantStyles = {
  primary: css\`
    background-color: rgba(49, 106, 255, 0.1);
    color: \${({ theme }) => theme.colors.primary};
  \`,
  success: css\`
    background-color: rgba(5, 205, 153, 0.1);
    color: \${({ theme }) => theme.colors.success};
  \`,
  error: css\`
    background-color: rgba(238, 93, 80, 0.1);
    color: \${({ theme }) => theme.colors.error};
  \`,
  warning: css\`
    background-color: rgba(255, 181, 71, 0.1);
    color: #ffb547;
  \`,
  default: css\`
    background-color: \${({ theme }) => theme.colors.background};
    color: \${({ theme }) => theme.colors.textMuted};
  \`,
};

const BadgeWrapper = styled.span<{ variant: BadgeVariant; pill?: boolean }>\`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: \${({ pill }) => (pill ? '999px' : '4px')};
  
  \${({ variant }) => variantStyles[variant]}
\`;

export const StyledBadge: React.FC<StyledBadgeProps> = ({
  children,
  variant = 'default',
  pill,
}) => {
  return (
    <BadgeWrapper variant={variant} pill={pill}>
      {children}
    </BadgeWrapper>
  );
};`;

  const usageCode = `/* [설명]
StyledBadge는 화면에서 상태 텍스트를 직접 색칠하지 않고 variant만 넘겨 사용합니다.

- default는 일반 대기 상태처럼 강조가 약한 값에 사용합니다.
- primary는 진행중, 선택됨, 현재 상태처럼 주요 상태에 사용합니다.
- success, warning, error는 완료/주의/실패처럼 의미가 분명한 상태에 사용합니다.
- pill은 New, 99+, Beta처럼 작은 태그나 카운터 배지에 적합합니다.
*/
<StyledBadge variant="default">대기중</StyledBadge>
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

        <CodeViewer rawCode={componentCode} language="tsx" filename="StyledBadge.tsx" />
        <CodeViewer rawCode={usageCode} language="tsx" filename="Badge Usage" />
      </StyledCard>
    </SamplePageLayout>
  );
};
