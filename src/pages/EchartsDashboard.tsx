import React from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { ChartCard } from '../components/common/ChartCard';
import * as options from '../data/echartsOptions';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const EchartsDashboard: React.FC = () => {
  return (
    <SamplePageLayout
      title="3. 대시보드 차트 (Dashboard Charts)"
      icon="ri-dashboard-2-line"
      description="핵심 지표(KPI)와 요약 정보를 가장 눈에 띄게 보여주는 실무 관리자 화면 전용 차트들입니다."
      learningPoints={[
        'xAxis와 yAxis의 show 속성을 false로 주어 깔끔한 스파크라인(Sparkline) 차트 만들기',
        'grid 속성을 조절하여 카드 영역에 차트를 꽉 채우는 여백 최적화 기법',
        'gauge 차트의 detail 옵션을 활용한 커스텀 텍스트 렌더링'
      ]}
      whyImportant="대시보드 메인 화면은 공간이 좁기 때문에 차트의 눈금, 라벨 등을 과감히 생략하고 '흐름'과 '핵심 숫자'만을 강조하는 스파크라인 형태의 차트가 필수적입니다."
    >
      <Grid>
        <ChartCard
          title="KPI + Mini Chart (스파크라인)"
          description="숫자와 함께 흐름만 간략하게 보여주는 초소형 차트입니다."
          useCase="일일 방문자 수 증감, 실시간 서버 CPU 사용량 요약 박스"
          option={options.getKpiMiniChartOption()}
          height="150px"
          codeSnippet={`{
  // 눈금과 라벨을 모두 숨깁니다
  xAxis: { show: false, type: 'category' },
  yAxis: { show: false, type: 'value' },
  // 여백을 0으로 만들어 영역을 꽉 채웁니다
  grid: { left: 0, right: 0, top: 0, bottom: 0 },
  series: [{ 
    type: 'line', smooth: true, showSymbol: false,
    areaStyle: { opacity: 0.2, color: '#05CD99' }
  }]
}`}
        />

        <ChartCard
          title="Monthly Sales Chart"
          description="월별 매출이나 핵심 성과를 깔끔한 막대로 보여줍니다."
          useCase="연간 부서별 실적 요약, MAU(월간 활성 사용자) 추세"
          option={options.getMonthlySalesChartOption()}
          codeSnippet={`// 막대의 상단 모서리만 둥글게 처리하는 실무 팁
series: [{
  type: 'bar',
  itemStyle: {
    color: '#316AFF',
    borderRadius: [4, 4, 0, 0] // [좌상, 우상, 우하, 좌하]
  }
}]`}
        />

        <ChartCard
          title="User Growth Chart (사용자 성장률)"
          description="부드러운 곡선과 굵은 선으로 성장 추이를 강력하게 강조합니다."
          useCase="누적 가입자 수, 분기별 매출 성장률"
          option={options.getUserGrowthChartOption()}
          codeSnippet={`{
  series: [{
    type: 'line',
    smooth: true,
    lineStyle: { width: 4 }, // 선을 일반 차트보다 두껍게 강조
    itemStyle: { color: '#EE5D50' }
  }]
}`}
        />

        <ChartCard
          title="Order Status Chart (주문 상태 도넛)"
          description="여러 상태값의 비중을 한눈에 볼 수 있는 도넛형 범례 차트입니다."
          useCase="결제 완료/취소/환불 비율, 서버 인스턴스 Running/Stopped 상태"
          option={options.getOrderStatusChartOption()}
          codeSnippet={`{
  legend: { bottom: '0%' }, // 범례를 차트 하단에 깔끔하게 배치
  series: [{
    type: 'pie',
    radius: ['40%', '70%'],
    center: ['50%', '40%'], // 범례 공간 확보를 위해 차트를 위로 살짝 올림
    data: [...]
  }]
}`}
        />

        <ChartCard
          title="KPI Half Gauge (반원 KPI 게이지)"
          description="Recharts의 반원 KPI 게이지와 완벽히 동일한 형태를 ECharts의 게이지 속성으로 구현한 차트입니다."
          useCase="부서별 영업 목표 달성률, 펀딩 모금액 진행률"
          option={options.getKpiGaugeChartOption()}
          codeSnippet={`// 바늘(pointer)과 눈금(tick)을 모두 숨기고, 배경 선의 색상 비율만 조정합니다.
series: [{
  type: 'gauge',
  startAngle: 180, endAngle: 0, // 반원 만들기
  pointer: { show: false }, // 바늘 지우기
  axisLine: {
    lineStyle: {
      width: 35,
      color: [
        [0.785, '#316AFF'], // 78.5% 지점까지 파란색
        [1, '#e2e8f0']      // 나머지 끝(100%)까지 회색
      ]
    }
  },
  detail: { formatter: '79%', offsetCenter: [0, '-10%'] } // 중앙 텍스트
}]`}
        />

        <ChartCard
          title="Gauge Chart (게이지 차트)"
          description="목표 달성률이나 현재의 강도를 직관적인 계기판 형태로 보여줍니다."
          useCase="영업 목표 달성률, 디스크 사용률 위험 경고, 만족도 점수"
          option={options.getGaugeChartOption()}
          codeSnippet={`{
  series: [{
    type: 'gauge',
    detail: { 
      formatter: '{value}%', // 중앙에 % 텍스트 추가
      fontSize: 20 
    },
    data: [{ value: 65, name: 'SCORE' }]
  }]
}`}
        />
      </Grid>
    </SamplePageLayout>
  );
};
