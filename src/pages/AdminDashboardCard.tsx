import React from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Card } from '../components/common/Card';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin: 10px 0;
`;

const StatFooter = styled.div<{ $trend: 'up' | 'down' | 'neutral' }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme, $trend }) => {
    if ($trend === 'up') return theme.colors.success;
    if ($trend === 'down') return theme.colors.error;
    return theme.colors.textMuted;
  }};

  i {
    font-size: 1.1rem;
  }
`;

const IconWrapper = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${({ $color }) => `${$color}15`};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

export const AdminDashboardCard: React.FC = () => {
  return (
    <SamplePageLayout
      title="대시보드 KPI 카드"
      icon="ri-dashboard-2-line"
      description="관리자 메인 화면 최상단에 배치되어 비즈니스의 핵심 지표(KPI)를 요약해 보여주는 카드 패턴입니다."
      learningPoints={[
        '공통 Card 컴포넌트를 활용한 깔끔한 컨테이너 구성',
        'CSS Grid를 이용해 화면 폭에 따라 자동으로 줄바꿈되는 반응형 레이아웃',
        '전일 대비 증감율(Trend)을 아이콘과 색상(성공/에러)으로 시각화',
      ]}
      whyImportant="경영진과 관리자가 접속하자마자 가장 먼저 확인하는 데이터입니다. 숫자의 크기와 증감 추이를 가장 직관적이고 빠르게 인식할 수 있도록 큼직한 타이포그래피와 여백을 사용해야 합니다."
    >
      <GridContainer>
        <Card
          title="오늘의 매출"
          extra={<IconWrapper $color="#316AFF"><i className="ri-money-dollar-circle-line" /></IconWrapper>}
        >
          <StatValue>₩24,500,000</StatValue>
          <StatFooter $trend="up">
            <i className="ri-arrow-right-up-line" />
            전일 대비 12.5% 증가
          </StatFooter>
        </Card>

        <Card
          title="신규 가입자"
          extra={<IconWrapper $color="#05CD99"><i className="ri-user-add-line" /></IconWrapper>}
        >
          <StatValue>1,245명</StatValue>
          <StatFooter $trend="up">
            <i className="ri-arrow-right-up-line" />
            전일 대비 5.2% 증가
          </StatFooter>
        </Card>

        <Card
          title="이탈률 (Bounce Rate)"
          extra={<IconWrapper $color="#EE5D50"><i className="ri-user-unfollow-line" /></IconWrapper>}
        >
          <StatValue>42.3%</StatValue>
          <StatFooter $trend="down">
            <i className="ri-arrow-right-down-line" />
            전일 대비 2.1% 악화
          </StatFooter>
        </Card>

        <Card
          title="활성 서버 노드"
          extra={<IconWrapper $color="#A3AED0"><i className="ri-server-line" /></IconWrapper>}
        >
          <StatValue>12 / 12</StatValue>
          <StatFooter $trend="neutral">
            <i className="ri-subtract-line" />
            변동 없음
          </StatFooter>
        </Card>
      </GridContainer>
    </SamplePageLayout>
  );
};

/*
[설명]
대시보드의 핵심 지표를 보여주는 4열 반응형 카드 뷰입니다.

실무 패턴:
- `Card` 컴포넌트의 `extra` prop을 활용해 우측 상단에 연관 아이콘을 배치했습니다.
- `trend` (up/down/neutral) 상태에 따라 텍스트 색상과 화살표 아이콘을 동적으로 렌더링합니다.
- 부모 컨테이너에 `grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));`을 주어 모바일에서는 1열, 태블릿에서는 2열, PC에서는 4열로 자연스럽게 배치되도록 만들었습니다.
*/
