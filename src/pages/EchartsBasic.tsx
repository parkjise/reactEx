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
          codeSnippet={`{
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  yAxis: { type: 'value' },
  series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: 'line' }]
}`}
        />

        <ChartCard
          title="Line Chart with Labels (데이터 라벨 꺾은선)"
          description="마우스를 올리지 않아도 각 데이터 포인트 위에 수치(라벨)가 바로 표시됩니다."
          useCase="보고서용 캡처 화면, 수치 확인이 바로 필요한 핵심 지표"
          option={options.getLineChartWithLabelsOption()}
          codeSnippet={`// series 내부에 label 옵션을 추가하여 데이터 값을 상단에 표시합니다.
series: [{ 
  data: [150, 230, 224, 218, 135, 147, 260], 
  type: 'line',
  label: { 
    show: true, 
    position: 'top', 
    fontSize: 13, 
    fontWeight: 'bold' 
  }
}]`}
        />

        <ChartCard
          title="Smooth Line Chart (부드러운 꺾은선)"
          description="smooth 속성을 추가하여 선의 꺾임을 부드러운 곡선으로 처리합니다."
          useCase="온도 변화, 주식 가격 추세"
          option={options.getSmoothLineChartOption()}
          codeSnippet={`// series 안에 smooth: true 를 추가합니다.
series: [{ 
  data: [150, 230, 224, 218, 135, 147, 260], 
  type: 'line', 
  smooth: true,
  itemStyle: { color: '#05CD99' }
}]`}
        />

        <ChartCard
          title="Bar Chart (세로 막대)"
          description="항목 간의 크기를 비교할 때 가장 직관적인 차트입니다."
          useCase="부서별 매출 비교, 상품별 판매량"
          option={options.getBarChartOption()}
          codeSnippet={`{
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  yAxis: { type: 'value' },
  series: [{ data: [120, 200, 150, 80, 70, 110, 130], type: 'bar' }]
}`}
        />

        <ChartCard
          title="Horizontal Bar Chart (가로 막대)"
          description="항목 이름이 길거나 항목의 개수가 많을 때 유리합니다."
          useCase="국가별 수출액, 설문조사 항목별 결과"
          option={options.getHorizontalBarChartOption()}
          codeSnippet={`// xAxis와 yAxis의 type을 반대로 설정하면 가로 막대가 됩니다.
{
  xAxis: { type: 'value' },
  yAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  series: [{ data: [120, 200, 150, 80, 70, 110, 130], type: 'bar' }]
}`}
        />

        <ChartCard
          title="Pie Chart (파이 차트)"
          description="전체에서 각 항목이 차지하는 비율을 나타냅니다."
          useCase="시장 점유율, 유입 경로별 비율"
          option={options.getPieChartOption()}
          codeSnippet={`{
  tooltip: { trigger: 'item' },
  series: [{
    type: 'pie', 
    radius: '50%',
    data: [
      { value: 1048, name: 'Search Engine' },
      { value: 735, name: 'Direct' }
    ]
  }]
}`}
        />

        <ChartCard
          title="Doughnut Chart (도넛 차트)"
          description="파이 차트의 중앙을 비워 레이블이나 총합을 표시하기 좋습니다."
          useCase="목표 달성률, 디스크 용량 사용량"
          option={options.getDoughnutChartOption()}
          codeSnippet={`// radius 배열에 내부 원과 외부 원의 크기를 지정합니다.
series: [{
  type: 'pie', 
  radius: ['40%', '70%'],
  itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
  data: [...]
}]`}
        />
      </Grid>
    </SamplePageLayout>
  );
};
