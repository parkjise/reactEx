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
          codeSnippet={`export const getMultipleLineChartOption = () => ({
  tooltip: { trigger: 'axis' },
  legend: { data: ['Product A', 'Product B', 'Product C'] },
  xAxis: { type: 'category', boundaryGap: false, data: ECHARTS_DATA.compare.categories },
  yAxis: { type: 'value' },
  series: ECHARTS_DATA.compare.seriesData.map(s => ({ ...s, type: 'line' }))
});`}
        />

        <ChartCard
          title="Grouped Bar Chart (그룹 막대)"
          description="같은 카테고리 내에서 항목들을 나란히 배치하여 크기를 비교합니다."
          useCase="연령대별 남/녀 구매량, 분기별 목표 vs 달성"
          option={options.getGroupedBarChartOption()}
          codeSnippet={`export const getGroupedBarChartOption = () => ({
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  legend: { data: ['Product A', 'Product B', 'Product C'] },
  xAxis: { type: 'category', data: ECHARTS_DATA.compare.categories },
  yAxis: { type: 'value' },
  series: ECHARTS_DATA.compare.seriesData.map(s => ({ ...s, type: 'bar' }))
});`}
        />

        <ChartCard
          title="Stacked Bar Chart (누적 막대)"
          description="각 항목의 합계(전체 크기)와 그 안의 구성 비율을 동시에 보여줍니다."
          useCase="월별 총매출 내 상품별 비중, 지역별 유권자 정당 지지율"
          option={options.getStackedBarChartOption()}
          codeSnippet={`export const getStackedBarChartOption = () => ({
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  legend: { data: ['Product A', 'Product B', 'Product C'] },
  xAxis: { type: 'category', data: ECHARTS_DATA.compare.categories },
  yAxis: { type: 'value' },
  series: ECHARTS_DATA.compare.seriesData.map(s => ({ ...s, type: 'bar', stack: 'total' }))
});`}
        />

        <ChartCard
          title="Area Chart (면적 차트)"
          description="선 아래의 공간을 색으로 채워 데이터의 '양(Volume)'을 시각적으로 강조합니다."
          useCase="서버 트래픽 밴드위스, 누적 누적 방문자 수"
          option={options.getAreaChartOption()}
          codeSnippet={`export const getAreaChartOption = () => ({
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', boundaryGap: false, data: ECHARTS_DATA.basic.categories },
  yAxis: { type: 'value' },
  series: [{
    data: ECHARTS_DATA.basic.lineData, type: 'line', areaStyle: {}
  }]
});`}
        />

        <ChartCard
          title="Stacked Area Chart (누적 면적)"
          description="면적 차트를 누적하여 전체 데이터의 양과 부분별 비율을 시계열로 보여줍니다."
          useCase="앱 내 기능별 사용 시간 추이, 포트폴리오 자산 배분 비율 추이"
          option={options.getStackedAreaChartOption()}
          codeSnippet={`export const getStackedAreaChartOption = () => ({
  tooltip: { trigger: 'axis', axisPointer: { type: 'cross', label: { backgroundColor: '#6a7985' } } },
  legend: { data: ['Product A', 'Product B', 'Product C'] },
  xAxis: { type: 'category', boundaryGap: false, data: ECHARTS_DATA.compare.categories },
  yAxis: { type: 'value' },
  series: ECHARTS_DATA.compare.seriesData.map(s => ({ ...s, type: 'line', stack: 'Total', areaStyle: {}, emphasis: { focus: 'series' } }))
});`}
        />
      </Grid>
    </SamplePageLayout>
  );
};
