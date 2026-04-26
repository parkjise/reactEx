import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Card } from '../components/common/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const generateInitialData = () => {
  const data = [];
  const now = new Date();
  for (let i = 20; i >= 0; i--) {
    data.push({
      time: new Date(now.getTime() - i * 1000).toLocaleTimeString().split(' ')[1],
      cpu: Math.floor(Math.random() * 40) + 20,
      memory: Math.floor(Math.random() * 30) + 40,
    });
  }
  return data;
};

export const LiveChartDashboard: React.FC = () => {
  const [data, setData] = useState(generateInitialData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData.slice(1)];
        newData.push({
          time: new Date().toLocaleTimeString().split(' ')[1],
          cpu: Math.floor(Math.random() * 40) + 20,
          memory: Math.floor(Math.random() * 30) + 40,
        });
        return newData;
      });
    }, 1000); // 1초마다 업데이트

    return () => clearInterval(interval);
  }, []);

  return (
    <SamplePageLayout
      title="실시간 모니터링 차트 (Live Chart)"
      icon="ri-pulse-line"
      description="Recharts 라이브러리를 활용해 매초마다 서버 리소스(CPU, Memory) 변화를 실시간으로 그려주는 대시보드 꺾은선 차트입니다."
      learningPoints={[
        'Recharts의 <ResponsiveContainer>를 활용한 반응형 차트 구축',
        'setInterval을 활용하여 우측에서 좌측으로 데이터가 밀려나는 실시간 애니메이션 구현',
        '다중 라인(Line) 렌더링 및 Custom 색상 매핑 기법',
      ]}
      whyImportant="B2B 인프라 모니터링, 트래픽 관제 시스템 등에서 가장 널리 쓰이는 형태입니다. 데이터 배열을 큐(Queue)처럼 관리하여 성능 저하 없이 실시간 차트를 유지하는 것이 핵심입니다."
    >
      <Card title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="ri-server-line" /> 서버 리소스 실시간 모니터링
        </div>
      }>
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#64748b' }} tickMargin={10} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="cpu" 
                stroke="#316AFF" 
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }} 
                name="CPU 사용량 (%)"
              />
              <Line 
                type="monotone" 
                dataKey="memory" 
                stroke="#05CD99" 
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }} 
                name="Memory 사용량 (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </SamplePageLayout>
  );
};
