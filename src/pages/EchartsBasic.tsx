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

export const EchartsBasic: React.FC = () => {
  return (
    <SamplePageLayout
      title="1. 기본 차트 (Basic Charts)"
      icon="ri-bar-chart-fill"
      description="ECharts에서 가장 널리 쓰이는 6가지 기초 차트입니다."
      learningPoints={[
        'xAxis와 yAxis의 type 속성(category vs value) 차이 이해',
        'series의 type 속성에 따른 렌더링 변화 (line, bar, pie)',
        'tooltip trigger 속성 적용 (axis vs item)'
      ]}
      whyImportant="대부분의 데이터 시각화 요구사항은 이 기본 차트 6종으로 해결 가능합니다. ECharts의 option 객체 구조를 이해하는 첫 걸음입니다."
    >
      <Grid>
        <ChartCard
          title="Line Chart (기본 꺾은선)"
          description="시간에 따른 데이터의 추이를 보여줍니다."
          useCase="월별 가입자 수 변화, 주간 트래픽 추이"
          option={options.getLineChartOption()}
          codeSnippet={`export const getLineChartOption = () => ({
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ECHARTS_DATA.basic.categories },
  yAxis: { type: 'value' },
  series: [{ data: ECHARTS_DATA.basic.lineData, type: 'line' }]
});`}
        />

        <ChartCard
          title="Line Chart with Labels (데이터 라벨 꺾은선)"
          description="마우스를 올리지 않아도 각 데이터 포인트 위에 수치(라벨)가 바로 표시됩니다."
          useCase="보고서용 캡처 화면, 수치 확인이 바로 필요한 핵심 지표"
          option={options.getLineChartWithLabelsOption()}
          codeSnippet={`export const getLineChartWithLabelsOption = () => ({
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ECHARTS_DATA.basic.categories },
  yAxis: { type: 'value' },
  series: [{ 
    data: ECHARTS_DATA.basic.lineData, 
    type: 'line',
    label: { show: true, position: 'top', fontSize: 13, fontWeight: 'bold' },
    itemStyle: { color: '#EE5D50' }
  }]
});`}
        />

        <ChartCard
          title="Smooth Line Chart (부드러운 꺾은선)"
          description="smooth 속성을 추가하여 선의 꺾임을 부드러운 곡선으로 처리합니다."
          useCase="온도 변화, 주식 가격 추세"
          option={options.getSmoothLineChartOption()}
          codeSnippet={`export const getSmoothLineChartOption = () => ({
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ECHARTS_DATA.basic.categories },
  yAxis: { type: 'value' },
  series: [{ data: ECHARTS_DATA.basic.lineData, type: 'line', smooth: true, itemStyle: { color: '#05CD99' } }]
});`}
        />

        <ChartCard
          title="Bar Chart (세로 막대)"
          description="항목 간의 크기를 비교할 때 가장 직관적인 차트입니다."
          useCase="부서별 매출 비교, 상품별 판매량"
          option={options.getBarChartOption()}
          codeSnippet={`export const getBarChartOption = () => ({
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  xAxis: { type: 'category', data: ECHARTS_DATA.basic.categories },
  yAxis: { type: 'value' },
  series: [{ data: ECHARTS_DATA.basic.barData, type: 'bar', itemStyle: { color: '#316AFF' } }]
});`}
        />

        <ChartCard
          title="Horizontal Bar Chart (가로 막대)"
          description="항목 이름이 길거나 항목의 개수가 많을 때 유리합니다."
          useCase="국가별 수출액, 설문조사 항목별 결과"
          option={options.getHorizontalBarChartOption()}
          codeSnippet={`export const getHorizontalBarChartOption = () => ({
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  xAxis: { type: 'value' },
  yAxis: { type: 'category', data: ECHARTS_DATA.basic.categories },
  series: [{ data: ECHARTS_DATA.basic.barData, type: 'bar', itemStyle: { color: '#FFB547' } }]
});`}
        />

        <ChartCard
          title="Pie Chart (파이 차트)"
          description="전체에서 각 항목이 차지하는 비율을 나타냅니다."
          useCase="시장 점유율, 유입 경로별 비율"
          option={options.getPieChartOption()}
          codeSnippet={`export const getPieChartOption = () => ({
  tooltip: { trigger: 'item' },
  legend: { orient: 'vertical', left: 'left' },
  series: [{
    name: 'Access From', type: 'pie', radius: '50%',
    data: ECHARTS_DATA.basic.pieData,
    emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
  }]
});`}
        />

        <ChartCard
          title="Doughnut Chart (도넛 차트)"
          description="파이 차트의 중앙을 비워 레이블이나 총합을 표시하기 좋습니다."
          useCase="목표 달성률, 디스크 용량 사용량"
          option={options.getDoughnutChartOption()}
          codeSnippet={`export const getDoughnutChartOption = () => ({
  tooltip: { trigger: 'item' },
  legend: { top: '5%', left: 'center' },
  series: [{
    name: 'Access From', type: 'pie', radius: ['40%', '70%'],
    avoidLabelOverlap: false,
    itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
    label: { show: false, position: 'center' },
    emphasis: { label: { show: true, fontSize: '20', fontWeight: 'bold' } },
    labelLine: { show: false },
    data: ECHARTS_DATA.basic.pieData
  }]
});`}
        />
      </Grid>
    </SamplePageLayout>
  );
};
