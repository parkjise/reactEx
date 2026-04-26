import React from 'react';
import styled from 'styled-components';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts'; // For types
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Card } from '../components/common/Card';

const ChartContainer = styled.div`
  height: 350px;
  width: 100%;
`;

// 가상의 히트맵 데이터 생성 함수 (24시간 x 7일)
const getVirtualData = () => {
  const data = [];
  for (let i = 0; i < 7; i++) { // 요일 (0-6)
    for (let j = 0; j < 24; j++) { // 시간 (0-23)
      // 특정 시간대에 트래픽(값)을 높게 설정하는 더미 로직
      let val = Math.floor(Math.random() * 10);
      if (j >= 9 && j <= 18) val += Math.floor(Math.random() * 50); // 업무시간
      if (j >= 12 && j <= 13) val -= 20; // 점심시간
      if (i === 0 || i === 6) val = Math.floor(Math.random() * 15); // 주말
      
      data.push([j, i, Math.max(0, val)]);
    }
  }
  return data;
};

export const EchartsHeatmap: React.FC = () => {
  const hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a',
                 '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p'];
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const data = getVirtualData().map((item) => {
    return [item[0], item[1], item[2] || '-'];
  });

  const option = {
    tooltip: {
      position: 'top',
      formatter: function (params: any) {
        return `${days[params.value[1]]}요일 ${hours[params.value[0]]}: ${params.value[2]}건`;
      }
    },
    grid: {
      height: '70%',
      top: '10%'
    },
    xAxis: {
      type: 'category',
      data: hours,
      splitArea: {
        show: true
      }
    },
    yAxis: {
      type: 'category',
      data: days,
      splitArea: {
        show: true
      }
    },
    visualMap: {
      min: 0,
      max: 60,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '0%',
      inRange: {
        // 값이 낮을수록 밝은색, 높을수록 진한색
        color: ['#f8fafc', '#bae6fd', '#38bdf8', '#0284c7', '#082f49']
      }
    },
    series: [
      {
        name: 'Traffic',
        type: 'heatmap',
        data: data,
        label: {
          show: true,
          color: '#000',
          fontSize: 10
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <SamplePageLayout
      title="매트릭스 히트맵 (ECharts)"
      icon="ri-grid-fill"
      description="시간대별 트래픽, 장애 발생 빈도 등을 색상의 진하기로 표현하는 매트릭스(Matrix) 히트맵 차트입니다."
      learningPoints={[
        '2차원 배열 데이터를 X축(시간), Y축(요일) 격자에 매핑하는 방법',
        'visualMap 컴포넌트를 이용한 데이터 값과 색상(inRange color) 자동 맵핑',
        '셀에 마우스를 올렸을 때 강조(emphasis)되는 이펙트 처리'
      ]}
      whyImportant="깃허브의 잔디(Contribution) 차트와 같은 원리입니다. 하루 단위나 시간 단위로 수많은 데이터가 쌓이는 시스템 모니터링 환경에서 '어느 요일, 어느 시간대에 부하가 몰리는지' 시각적인 패턴으로 한눈에 분석할 수 있습니다."
    >
      <Card title="주간 요일/시간별 트래픽 분포 패턴">
        <ChartContainer>
          <ReactECharts 
            option={option} 
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </ChartContainer>
      </Card>
    </SamplePageLayout>
  );
};
