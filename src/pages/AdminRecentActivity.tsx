import React from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

const TimelineContainer = styled.div`
  position: relative;
  padding-left: 24px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 7px;
    width: 2px;
    background-color: ${({ theme }) => theme.colors.border};
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const TimelineDot = styled.div<{ $color?: string }>`
  position: absolute;
  left: -24px;
  top: 4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({ theme, $color }) => $color || theme.colors.primary};
  border: 3px solid ${({ theme }) => theme.colors.surface};
  box-shadow: 0 0 0 1px ${({ theme, $color }) => $color || theme.colors.primary};
`;

const TimelineContent = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ActivityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const ActivityTitle = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
`;

const ActivityTime = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const ActivityDesc = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;

  strong {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const AdminRecentActivity: React.FC = () => {
  return (
    <SamplePageLayout
      title="최근 활동 목록 (타임라인)"
      icon="ri-history-line"
      description="시스템 로그, 회원 가입, 관리자 설정 변경 등의 주요 이력을 타임라인 형태로 렌더링합니다."
      learningPoints={[
        'CSS 가상 요소(::before)를 활용한 타임라인 연결선 렌더링 기법',
        '상대 포지션(absolute)을 이용한 타임라인 점(Dot) 배치',
        '활동 종류(에러, 일반, 중요)에 따른 타임라인 점의 동적 색상 변경',
      ]}
      whyImportant="관리자가 시스템에 부재중이었을 때 발생한 중요 이벤트를 시계열로 빠르게 파악할 수 있도록 돕는 필수 위젯입니다. 보통 대시보드 우측이나 하단에 위치합니다."
    >
      <Card title="시스템 최근 활동 내역">
        <TimelineContainer>
          <TimelineItem>
            <TimelineDot $color="#EE5D50" />
            <TimelineContent>
              <ActivityHeader>
                <ActivityTitle>
                  <Badge status="error">시스템 경고</Badge> 결제 모듈 응답 지연
                </ActivityTitle>
                <ActivityTime>10분 전</ActivityTime>
              </ActivityHeader>
              <ActivityDesc>
                PG사 서버 응답이 3초 이상 지연되어 <strong>5건</strong>의 결제가 실패했습니다.
              </ActivityDesc>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineDot $color="#05CD99" />
            <TimelineContent>
              <ActivityHeader>
                <ActivityTitle>신규 가입 폭증 알림</ActivityTitle>
                <ActivityTime>2시간 전</ActivityTime>
              </ActivityHeader>
              <ActivityDesc>
                마케팅 캠페인 A의 효과로 1시간 동안 <strong>300명</strong>의 신규 가입자가 발생했습니다.
              </ActivityDesc>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineDot />
            <TimelineContent>
              <ActivityHeader>
                <ActivityTitle>설정 변경 로그</ActivityTitle>
                <ActivityTime>어제 오후 4:30</ActivityTime>
              </ActivityHeader>
              <ActivityDesc>
                <strong>admin_super</strong> 계정이 배송비 무료 기준액을 30,000원에서 50,000원으로 변경했습니다.
              </ActivityDesc>
            </TimelineContent>
          </TimelineItem>
        </TimelineContainer>
      </Card>
    </SamplePageLayout>
  );
};

/*
[설명]
시계열 데이터를 시각적으로 연결해주는 타임라인 컴포넌트입니다.

실무 패턴:
- `TimelineContainer`의 `::before`에 왼쪽에서 7px(`left: 7px`) 떨어진 위치에 세로줄을 긋습니다.
- 그 위를 덮는 `TimelineDot`을 `left: -24px`로 밀어내어 선 위에 정확히 동그라미가 겹치도록 만드는 것이 CSS 타임라인의 핵심 테크닉입니다.
*/
