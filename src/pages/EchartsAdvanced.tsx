import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { ChartCard } from '../components/common/ChartCard';
import { StyledModal } from '../components/styled/StyledModal';
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

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  .detail-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
  
  .value {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const EchartsAdvanced: React.FC = () => {
  const [realtimeData, setRealtimeData] = useState<number[]>(Array.from({length: 20}, () => Math.floor(Math.random() * 100)));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>(null);

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

  const handleChartClick = (params: any) => {
    if (params.componentType === 'series' && params.seriesType === 'line') {
      setModalData(params);
      setIsModalOpen(true);
    }
  };

  const clickEvents = {
    click: handleChartClick
  };

  return (
    <SamplePageLayout
      title="4. 고급 기능 (Advanced ECharts)"
      icon="ri-tools-fill"
      description="ECharts가 다른 라이브러리를 압도하는 강력한 커스터마이징 및 데이터 탐색 기능들입니다."
      learningPoints={[
        'formatter 함수를 이용한 툴팁(Tooltip) 내부 HTML 완벽 제어',
        'dataZoom을 활용한 방대한 시계열 데이터 스크롤 및 확대/축소',
        'markPoint와 markLine을 이용한 최고점/최저점 및 평균선 자동 마커 기능',
        'react의 상태(State)와 연동된 실시간(Real-time) 차트 업데이트 원리',
        'onEvents 속성을 활용한 차트 데이터 클릭 및 모달(Modal) 연동'
      ]}
      whyImportant="고객은 단순한 차트 이상의 '인터랙션'을 원합니다. 마우스를 올렸을 때 화려한 정보가 나오고, 수천 개의 데이터를 줌인/줌아웃 할 수 있는 기능이 프리미엄 대시보드의 기준이 됩니다."
    >
      <Grid>
        <ChartCard
          title="Line Chart Click Event (클릭 시 모달)"
          description="라인 차트의 동그라미(데이터 포인트)를 클릭하면 상세 정보를 보여주는 모달 창이 뜹니다."
          useCase="차트의 특정 일자를 클릭하여 해당 일자의 상세 리스트나 테이블을 모달로 띄울 때"
          option={options.getClickModalOption()}
          onEvents={clickEvents}
          codeSnippet={`// 1. echartsOptions.ts
export const getClickModalOption = () => ({
  tooltip: { trigger: 'item' },
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  yAxis: { type: 'value' },
  series: [{
    name: '방문자 수',
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    type: 'line',
    symbolSize: 10,
    itemStyle: { color: '#316AFF' },
    lineStyle: { width: 3 },
    emphasis: { focus: 'series', itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.3)' } }
  }]
});

// 2. Styled Components (Modal Style)
const ModalContent = styled.div\`
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  .detail-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid \${({ theme }) => theme.colors.border};
  }
  
  .value {
    font-weight: bold;
    color: \${({ theme }) => theme.colors.primary};
  }
\`;

// 3. React Component (Event Handler)
const handleChartClick = (params: any) => {
  if (params.componentType === 'series' && params.seriesType === 'line') {
    setModalData(params);
    setIsModalOpen(true);
  }
};

const clickEvents = { click: handleChartClick };

// 4. React JSX (Chart & Modal)
return (
  <>
    <ReactECharts 
      option={option} 
      onEvents={clickEvents} 
    />

    <StyledModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="차트 상세 정보"
    >
      {modalData && (
        <ModalContent>
          <div className="detail-row">
            <span>카테고리 (X축):</span>
            <span className="value">{modalData.name}</span>
          </div>
          <div className="detail-row">
            <span>시리즈 이름:</span>
            <span className="value">{modalData.seriesName}</span>
          </div>
          <div className="detail-row">
            <span>선택된 데이터 값:</span>
            <span className="value">{modalData.value.toLocaleString()}명</span>
          </div>
        </ModalContent>
      )}
    </StyledModal>
  </>
);`}
        />

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

      <StyledModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="차트 상세 정보"
      >
        {modalData && (
          <ModalContent>
            <div className="detail-row">
              <span>카테고리 (X축):</span>
              <span className="value">{modalData.name}</span>
            </div>
            <div className="detail-row">
              <span>시리즈 이름:</span>
              <span className="value">{modalData.seriesName}</span>
            </div>
            <div className="detail-row">
              <span>선택된 데이터 값:</span>
              <span className="value">{modalData.value.toLocaleString()}명</span>
            </div>
          </ModalContent>
        )}
      </StyledModal>
    </SamplePageLayout>
  );
};

/*
[설명]
ECharts의 고급 기능들을 보여주는 페이지입니다.

실무 패턴:
- \`onEvents\`: 차트 내장 이벤트를 React의 상태와 연결하여 모달 창이나 상세 패널을 여는 등의 인터랙션을 구현합니다.
- \`tooltip.formatter\`: 복잡한 HTML과 인라인 스타일을 활용해 툴팁 디자인을 완전히 커스텀할 수 있습니다.
- \`dataZoom\`: 대량의 시계열 데이터를 핸들링할 때 성능 저하 없이 확대/축소를 지원하는 필수 기능입니다.
- \`notMerge={true}\`: 실시간 데이터 갱신 시 이전 데이터 잔상이 남지 않도록 완전히 새로운 데이터로 덮어씌웁니다.
*/
