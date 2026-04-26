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

export const EchartsCompare: React.FC = () => {
  return (
    <SamplePageLayout
      title="2. 비교 차트 (Compare Charts)"
      icon="ri-bar-chart-grouped-line"
      description="여러 개의 데이터 시리즈를 하나의 차트에 올려 비교 분석하는 패턴입니다."
      learningPoints={[
        'series 배열에 여러 객체를 넣어 다중 차트 렌더링하기',
        'stack 속성을 활용한 누적(Stacked) 그래프 표현',
        'areaStyle을 활용한 면적(Area) 그래프 구현 방식'
      ]}
      whyImportant="단일 지표만으로는 인사이트를 얻기 어렵습니다. '작년 대비 올해', 'A상품 vs B상품' 등 그룹 간 비교가 B2B 솔루션의 핵심입니다."
    >
      <Grid>
        <ChartCard
          title="Multiple Line Chart (다중 꺾은선)"
          description="여러 항목의 시계열 추이를 겹쳐서 비교합니다."
          useCase="경쟁사별 시장 점유율 변화, 월별/연도별 실적 비교"
          option={options.getMultipleLineChartOption()}
          codeSnippet={`{
  legend: { data: ['Product A', 'Product B', 'Product C'] },
  xAxis: { type: 'category', data: ['2018', '2019', '2020'] },
  // series 배열에 3개의 객체가 들어갑니다.
  series: [
    { name: 'Product A', data: [120, 132, 101], type: 'line' },
    { name: 'Product B', data: [220, 182, 191], type: 'line' },
    { name: 'Product C', data: [150, 232, 201], type: 'line' }
  ]
}`}
        />

        <ChartCard
          title="Grouped Bar Chart (그룹 막대)"
          description="같은 카테고리 내에서 항목들을 나란히 배치하여 크기를 비교합니다."
          useCase="연령대별 남/녀 구매량, 분기별 목표 vs 달성"
          option={options.getGroupedBarChartOption()}
          codeSnippet={`// Multiple Line과 동일하게 series 배열만 여러 개 주면 ECharts가 알아서 나란히(Grouped) 배치합니다.
series: [
  { name: 'Product A', type: 'bar', data: [120, 132] },
  { name: 'Product B', type: 'bar', data: [220, 182] }
]`}
        />

        <ChartCard
          title="Stacked Bar Chart (누적 막대)"
          description="각 항목의 합계(전체 크기)와 그 안의 구성 비율을 동시에 보여줍니다."
          useCase="월별 총매출 내 상품별 비중, 지역별 유권자 정당 지지율"
          option={options.getStackedBarChartOption()}
          codeSnippet={`// 각 series 객체에 동일한 stack 속성값(예: 'total')을 부여하면 막대가 위로 쌓입니다.
series: [
  { name: 'Product A', type: 'bar', stack: 'total', data: [120, 132] },
  { name: 'Product B', type: 'bar', stack: 'total', data: [220, 182] }
]`}
        />

        <ChartCard
          title="Area Chart (면적 차트)"
          description="선 아래의 공간을 색으로 채워 데이터의 '양(Volume)'을 시각적으로 강조합니다."
          useCase="서버 트래픽 밴드위스, 누적 누적 방문자 수"
          option={options.getAreaChartOption()}
          codeSnippet={`// line 차트에서 areaStyle 객체를 추가하면 면적 차트가 됩니다.
series: [{
  type: 'line',
  data: [150, 230, 224],
  areaStyle: {} // 기본 투명도로 색칠됨
}]`}
        />

        <ChartCard
          title="Stacked Area Chart (누적 면적)"
          description="면적 차트를 누적하여 전체 데이터의 양과 부분별 비율을 시계열로 보여줍니다."
          useCase="앱 내 기능별 사용 시간 추이, 포트폴리오 자산 배분 비율 추이"
          option={options.getStackedAreaChartOption()}
          codeSnippet={`// stack 속성과 areaStyle을 동시에 적용합니다.
series: [
  { name: 'A', type: 'line', stack: 'Total', areaStyle: {}, data: [120, 132] },
  { name: 'B', type: 'line', stack: 'Total', areaStyle: {}, data: [220, 182] }
]`}
        />
      </Grid>
    </SamplePageLayout>
  );
};
