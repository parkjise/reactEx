import React from 'react';
import styled from 'styled-components';
import ReactECharts from 'echarts-for-react';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Card } from '../components/common/Card';

const ChartContainer = styled.div`
  height: 500px;
  width: 100%;
`;

export const EchartsRadar: React.FC = () => {
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      data: ['기존 모델 (V1.0)', '신규 모델 (V2.0)'],
      bottom: 0
    },
    radar: {
      // 5가지 다각도 평가 지표 설정
      indicator: [
        { name: '속도 (Speed)', max: 100 },
        { name: '안정성 (Stability)', max: 100 },
        { name: '보안 (Security)', max: 100 },
        { name: '사용성 (Usability)', max: 100 },
        { name: '확장성 (Scalability)', max: 100 }
      ],
      shape: 'polygon', // 'circle' | 'polygon'
      splitNumber: 5,
      axisName: {
        color: '#475569',
        fontWeight: 'bold',
        padding: [3, 5]
      },
      splitArea: {
        areaStyle: {
          color: ['#f8f9fa', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8'],
          shadowColor: 'rgba(0, 0, 0, 0.05)',
          shadowBlur: 10
        }
      },
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      splitLine: { lineStyle: { color: '#cbd5e1' } }
    },
    series: [
      {
        name: '버전별 스펙 비교',
        type: 'radar',
        data: [
          {
            value: [65, 70, 80, 50, 40],
            name: '기존 모델 (V1.0)',
            itemStyle: { color: '#EE5D50' },
            areaStyle: { color: 'rgba(238, 93, 80, 0.2)' }
          },
          {
            value: [90, 85, 95, 80, 85],
            name: '신규 모델 (V2.0)',
            itemStyle: { color: '#316AFF' },
            areaStyle: { color: 'rgba(49, 106, 255, 0.3)' }
          }
        ]
      }
    ]
  };

  return (
    <SamplePageLayout
      title="레이더 차트 (ECharts)"
      icon="ri-radar-line"
      description="다차원 데이터를 평가하거나 두 개 이상의 대상을 다각도로 비교할 때 쓰이는 레이더(거미줄) 차트입니다."
      learningPoints={[
        'ECharts radar 속성을 활용한 다각형 평가 지표(indicator) 구축',
        'areaStyle을 활용한 투명도(rgba) 면적 색칠 및 오버레이 기법',
        'shape: "polygon"과 배경 splitArea(동심원 영역 색상) 조정'
      ]}
      whyImportant="팀원 역량 평가, 제품군 스펙 비교, AI 모델 성능 지표 등 한눈에 육각형(또는 오각형) 밸런스를 파악해야 하는 화면에서 독보적인 역할을 합니다."
    >
      <Card title="소프트웨어 버전별 성능 밸런스 비교">
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
