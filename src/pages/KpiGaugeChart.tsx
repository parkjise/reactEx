import React from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Card } from '../components/common/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const GaugeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const GaugeValue = styled.div`
  position: absolute;
  bottom: 20px;
  text-align: center;
  
  .value {
    font-size: 2.5rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
  }
  
  .label {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textMuted};
    margin-top: 4px;
  }
`;

export const KpiGaugeChart: React.FC = () => {
  // 목표 달성률 계산 로직
  const target = 1000;
  const current = 785;
  const percentage = Math.round((current / target) * 100);

  // 게이지를 그리기 위한 배열: [달성량, 남은량]
  const data = [
    { name: '달성량', value: current },
    { name: '남은량', value: target - current }
  ];

  const COLORS = ['#316AFF', '#e2e8f0'];

  return (
    <SamplePageLayout
      title="목표 달성 게이지 (Gauge Chart)"
      icon="ri-dashboard-3-line"
      description="Recharts의 PieChart를 반원 형태로 잘라서 만든 대시보드 KPI(핵심 성과 지표) 게이지 차트입니다."
      learningPoints={[
        'PieChart 컴포넌트의 startAngle(180)과 endAngle(0) 속성을 조작하여 반원 만들기',
        'Cell 컴포넌트를 이용한 채워진 부분과 비워진 부분의 색상 분리 매핑',
        'CSS position: absolute를 활용하여 차트 중앙 하단에 동적 텍스트(퍼센트) 오버레이 렌더링',
      ]}
      whyImportant="영업/마케팅 대시보드에서 가장 좋아하는 차트입니다. 사용자는 복잡한 숫자를 읽을 필요 없이 '색칠된 면적'만으로 목표 달성 상태를 1초 만에 파악할 수 있습니다."
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        <Card title="이번 달 매출 목표 달성률">
          <GaugeContainer>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="100%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={100}
                  outerRadius={140}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            
            <GaugeValue>
              <div className="value">{percentage}%</div>
              <div className="label">목표 {target.toLocaleString()}건 중 {current.toLocaleString()}건 달성</div>
            </GaugeValue>
          </GaugeContainer>
        </Card>
      </div>
    </SamplePageLayout>
  );
};
