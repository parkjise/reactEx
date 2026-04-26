import React from 'react';
import styled from 'styled-components';
import ReactECharts from 'echarts-for-react';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Card } from '../components/common/Card';

const ChartContainer = styled.div`
  height: 450px;
  width: 100%;
`;

export const EchartsMixed: React.FC = () => {
  // ECharts 고유의 선언형 옵션(Option) 객체
  const option = {
    // 툴팁 설정
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross', crossStyle: { color: '#999' } }
    },
    // 범례
    legend: {
      data: ['월별 매출(천만 원)', '전년 대비 성장률(%)'],
      bottom: 0
    },
    // 차트 여백
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    // X축
    xAxis: [
      {
        type: 'category',
        data: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        axisPointer: { type: 'shadow' }
      }
    ],
    // 이중 Y축 (왼쪽: 막대, 오른쪽: 꺾은선)
    yAxis: [
      {
        type: 'value',
        name: '매출액',
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: { formatter: '{value} 억' }
      },
      {
        type: 'value',
        name: '성장률',
        min: 0,
        max: 25,
        interval: 5,
        axisLabel: { formatter: '{value} %' }
      }
    ],
    // 실제 데이터 매핑
    series: [
      {
        name: '월별 매출(천만 원)',
        type: 'bar',
        yAxisIndex: 0, // 첫 번째 Y축(왼쪽) 사용
        itemStyle: {
          color: '#316AFF',
          borderRadius: [4, 4, 0, 0] // 상단 모서리 둥글게
        },
        data: [20, 49, 70, 232, 256, 76, 135, 162, 32, 20, 64, 33]
      },
      {
        name: '전년 대비 성장률(%)',
        type: 'line',
        yAxisIndex: 1, // 두 번째 Y축(오른쪽) 사용
        itemStyle: { color: '#EE5D50' },
        lineStyle: { width: 3 },
        symbol: 'circle',
        symbolSize: 8,
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
      }
    ]
  };

  return (
    <SamplePageLayout
      title="이중 Y축 복합 차트 (ECharts)"
      icon="ri-bar-chart-2-line"
      description="Apache ECharts를 활용하여 단위가 다른 두 개의 데이터(매출액과 성장률)를 한 차트 안에 렌더링하는 실무 필수 패턴입니다."
      learningPoints={[
        '막대 그래프(Bar)와 꺾은선(Line)을 한 차트에 그리는 mixed chart 구현법',
        'yAxis 배열에 2개의 객체를 넣고, series의 yAxisIndex로 매핑하는 이중 축(Dual Axis) 처리',
        'ECharts의 강력한 선언형 옵션(Option) 객체 구조 이해',
      ]}
      whyImportant="B2B 대시보드에서 '비용'과 '건수', 또는 '매출'과 '성장률'처럼 절대적인 단위가 완전히 다른 지표의 상관관계를 보여줄 때 이중 Y축 차트가 반드시 필요합니다."
    >
      <Card title="2023년 월별 매출 추이 및 성장률 분석">
        <ChartContainer>
          {/* echarts-for-react 래퍼 컴포넌트 사용 */}
          <ReactECharts 
            option={option} 
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'svg' }} // 선명도를 위해 SVG 렌더러 사용 권장
          />
        </ChartContainer>
      </Card>
    </SamplePageLayout>
  );
};
