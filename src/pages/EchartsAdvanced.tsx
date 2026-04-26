import React, { useState, useEffect } from 'react';
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

export const EchartsAdvanced: React.FC = () => {
  const [realtimeData, setRealtimeData] = useState<number[]>(Array.from({length: 20}, () => Math.floor(Math.random() * 100)));

  useEffect(() => {
    const timer = setInterval(() => {
      setRealtimeData(prev => {
        const newData = [...prev.slice(1)];
        newData.push(Math.floor(Math.random() * 100));
        return newData;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SamplePageLayout
      title="4. 고급 기능 (Advanced ECharts)"
      icon="ri-tools-fill"
      description="ECharts가 다른 라이브러리를 압도하는 강력한 커스터마이징 및 데이터 탐색 기능들입니다."
      learningPoints={[
        'formatter 함수를 이용한 툴팁(Tooltip) 내부 HTML 완벽 제어',
        'dataZoom을 활용한 방대한 시계열 데이터 스크롤 및 확대/축소',
        'markPoint와 markLine을 이용한 최고점/최저점 및 평균선 자동 마커 기능',
        'react의 상태(State)와 연동된 실시간(Real-time) 차트 업데이트 원리'
      ]}
      whyImportant="고객은 단순한 차트 이상의 '인터랙션'을 원합니다. 마우스를 올렸을 때 화려한 정보가 나오고, 수천 개의 데이터를 줌인/줌아웃 할 수 있는 기능이 프리미엄 대시보드의 기준이 됩니다."
    >
      <Grid>
        <ChartCard
          title="Tooltip Custom (HTML 툴팁 커스텀)"
          description="툴팁 안에 단순한 텍스트가 아닌, 원하는 형태의 HTML 마크업(색상, 아이콘 등)을 직접 그려넣습니다."
          useCase="차트에 표시되지 않는 부가 정보 노출, 금액 단위 커스텀"
          option={options.getTooltipCustomOption()}
          codeSnippet={`tooltip: {
  trigger: 'axis',
  formatter: function (params) {
    // 자바스크립트로 HTML 문자열을 조립해서 반환합니다.
    let res = \`<b>\${params[0].name}</b><br/>\`;
    params.forEach(item => {
      res += \`<span style="...background-color:\${item.color}"></span> \`;
      res += \`\${item.seriesName}: ₩\${item.value.toLocaleString()}<br/>\`;
    });
    return res;
  }
}`}
        />

        <ChartCard
          title="Legend Custom (범례 커스텀)"
          description="차트 항목을 켜고 끄는 범례의 아이콘 모양, 폰트, 위치를 정교하게 조정합니다."
          useCase="디자인 가이드라인에 맞춘 범례 아이콘 변경"
          option={options.getLegendCustomOption()}
          codeSnippet={`legend: {
  data: ['Series 1', 'Series 2'],
  icon: 'circle', // 기본 사각형 대신 원형 아이콘 사용
  textStyle: { color: '#333', fontSize: 14, fontWeight: 'bold' },
  bottom: 10 // 차트 최하단에 배치
}`}
        />

        <ChartCard
          title="DataZoom (확대/축소 및 스크롤)"
          description="데이터가 너무 많을 때, 차트 하단에 스크롤바를 만들어 일부분만 확대해서 볼 수 있게 해줍니다."
          useCase="수년간의 일별 주식 차트, 수만 건의 센서 로그 데이터 조회"
          option={options.getDataZoomOption()}
          codeSnippet={`// 2가지 타입의 Zoom을 동시에 제공 (마우스 휠 + 하단 스크롤바)
dataZoom: [
  { type: 'inside' }, // 마우스 휠/터치 드래그로 줌인아웃
  { type: 'slider', bottom: 10 } // 하단에 드래그 가능한 스크롤바 제공
]`}
        />

        <ChartCard
          title="MarkLine & MarkPoint (자동 마커)"
          description="차트 데이터 중 최대값, 최소값을 찾아 핀을 꽂고 평균선(Average)을 자동으로 그어줍니다."
          useCase="월간 최고 매출일 강조, 서버 응답속도 평균/장애 임계선 표시"
          option={options.getMarkLinePointOption()}
          codeSnippet={`series: [{
  type: 'line',
  data: [10, 11, 13, 11, 12, 12, 9],
  markPoint: { 
    data: [{ type: 'max', name: 'Max' }, { type: 'min', name: 'Min' }] 
  },
  markLine: { 
    data: [{ type: 'average', name: 'Avg' }] 
  }
}]`}
        />

        <ChartCard
          title="VisualMap (값에 따른 색상 매핑)"
          description="데이터 값의 높고 낮음에 따라 차트 요소의 색상을 자동으로 그라데이션 매핑합니다."
          useCase="히트맵, 지역별 매출 규모에 따른 지도 색상 칠하기"
          option={options.getVisualMapOption()}
          codeSnippet={`visualMap: {
  min: 0,
  max: 10,
  calculable: true,
  orient: 'horizontal',
  inRange: { color: ['#e0f2fe', '#0284c7'] } // 이 범위 안에서 값에 비례해 색이 계산됨
}`}
        />

        <ChartCard
          title="Real-time Update Chart (실시간 차트)"
          description="React의 상태(State)가 변할 때마다 ECharts가 끊김 없이 부드러운 애니메이션으로 갱신됩니다."
          useCase="주식 호가창, 초당 서버 트래픽 실시간 모니터링"
          option={options.getRealtimeUpdateOption(realtimeData)}
          codeSnippet={`// React 컴포넌트에서 setInterval로 배열 데이터를 계속 변경합니다.
// echarts-for-react 에 notMerge={true} 옵션을 주면 
// 이전 데이터를 합치지 않고 즉각적으로 새로운 배열로 화면을 렌더링합니다.

<ReactECharts 
  option={option} 
  notMerge={true} // 실시간 차트의 필수 옵션
/>`}
        />
      </Grid>
    </SamplePageLayout>
  );
};
