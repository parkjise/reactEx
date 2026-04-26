import React from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Card } from '../components/common/Card';

const SummaryContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SummaryBlock = styled.div`
  flex: 1;
  padding: 24px;
  text-align: center;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;

  &:last-child {
    border-right: none;
  }

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    
    &:last-child {
      border-bottom: none;
    }
  }

  /* 화살표 모양 (PC에서만 노출) */
  &:not(:last-child)::after {
    content: '\\EA6E'; /* RemixIcon ri-arrow-right-s-line */
    font-family: 'remixicon';
    position: absolute;
    right: -12px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    background-color: ${({ theme }) => theme.colors.surface};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.textMuted};
    z-index: 1;
    border: 1px solid ${({ theme }) => theme.colors.border};

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const BlockTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 8px;
`;

const BlockValue = styled.div<{ $highlight?: boolean }>`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ theme, $highlight }) => ($highlight ? theme.colors.error : theme.colors.primary)};
`;

export const AdminStatusSummary: React.FC = () => {
  return (
    <SamplePageLayout
      title="상태(Pipeline) 요약 박스"
      icon="ri-git-commit-line"
      description="주문, 배송, 결제, 고객문의 등 단계별로 진행되는 업무의 현재 상태 건수를 파이프라인 형태로 보여주는 UI입니다."
      learningPoints={[
        'FlexBox를 활용한 등분할(1:1:1) 파이프라인 레이아웃 구성',
        'CSS ::after 가상 요소를 활용한 연결 화살표(Step) 시각화 기법',
        '모바일 환경에서 세로형 리스트로 우아하게 떨어지는 미디어 쿼리(Media Query)',
      ]}
      whyImportant="관리자가 오늘 처리해야 할 업무(To-Do)의 병목 구간을 빠르게 파악하기 위해 사용됩니다. 주문이 많이 들어왔는지, 반품 처리가 밀려있는지 한눈에 파악할 수 있어야 합니다."
    >
      <Card title="오늘의 주문 배송 현황">
        <SummaryContainer>
          <SummaryBlock>
            <BlockTitle>결제 대기</BlockTitle>
            <BlockValue>12</BlockValue>
          </SummaryBlock>
          <SummaryBlock>
            <BlockTitle>신규 주문 (상품 준비중)</BlockTitle>
            <BlockValue>34</BlockValue>
          </SummaryBlock>
          <SummaryBlock>
            <BlockTitle>배송 중</BlockTitle>
            <BlockValue>128</BlockValue>
          </SummaryBlock>
          <SummaryBlock>
            <BlockTitle>배송 완료</BlockTitle>
            <BlockValue>85</BlockValue>
          </SummaryBlock>
          <SummaryBlock>
            <BlockTitle>취소/반품/교환</BlockTitle>
            <BlockValue $highlight>3</BlockValue>
          </SummaryBlock>
        </SummaryContainer>
      </Card>
    </SamplePageLayout>
  );
};

/*
[설명]
상태가 순차적으로 흐르는 비즈니스 로직(예: 주문->결제->배송->완료)을 표현할 때 가장 널리 쓰이는 패턴입니다.

실무 패턴:
- 각 박스(`SummaryBlock`) 사이에 CSS 가상 요소(`::after`)를 사용해 진행 방향(화살표)을 그려 넣어 흐름(Pipeline)을 강조했습니다.
- 관리자가 특히 주의해야 할 지표(예: 반품, 클레임, 에러 건수)는 `$highlight` prop을 주어 붉은색 등 경고 색상으로 렌더링하여 시선을 끕니다.
*/
