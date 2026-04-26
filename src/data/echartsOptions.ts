// src/data/echartsOptions.ts
import { ECHARTS_DATA } from './echartsSampleData';

// --- 1. 기본 차트 (Basic Charts) ---
export const getLineChartOption = () => ({
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ECHARTS_DATA.basic.categories },
  yAxis: { type: 'value' },
  series: [{ data: ECHARTS_DATA.basic.lineData, type: 'line' }]
});

export const getLineChartWithLabelsOption = () => ({
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ECHARTS_DATA.basic.categories },
  yAxis: { type: 'value' },
  series: [{ 
    data: ECHARTS_DATA.basic.lineData, 
    type: 'line',
    label: { show: true, position: 'top', fontSize: 13, fontWeight: 'bold' },
    itemStyle: { color: '#EE5D50' }
  }]
});

export const getSmoothLineChartOption = () => ({
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ECHARTS_DATA.basic.categories },
  yAxis: { type: 'value' },
  series: [{ data: ECHARTS_DATA.basic.lineData, type: 'line', smooth: true, itemStyle: { color: '#05CD99' } }]
});

export const getBarChartOption = () => ({
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  xAxis: { type: 'category', data: ECHARTS_DATA.basic.categories },
  yAxis: { type: 'value' },
  series: [{ data: ECHARTS_DATA.basic.barData, type: 'bar', itemStyle: { color: '#316AFF' } }]
});

export const getHorizontalBarChartOption = () => ({
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  xAxis: { type: 'value' },
  yAxis: { type: 'category', data: ECHARTS_DATA.basic.categories },
  series: [{ data: ECHARTS_DATA.basic.barData, type: 'bar', itemStyle: { color: '#FFB547' } }]
});

export const getPieChartOption = () => ({
  tooltip: { trigger: 'item' },
  legend: { orient: 'vertical', left: 'left' },
  series: [{
    name: 'Access From', type: 'pie', radius: '50%',
    data: ECHARTS_DATA.basic.pieData,
    emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
  }]
});

export const getDoughnutChartOption = () => ({
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
});

// --- 2. 비교 차트 (Compare Charts) ---
export const getMultipleLineChartOption = () => ({
  tooltip: { trigger: 'axis' },
  legend: { data: ['Product A', 'Product B', 'Product C'] },
  xAxis: { type: 'category', boundaryGap: false, data: ECHARTS_DATA.compare.categories },
  yAxis: { type: 'value' },
  series: ECHARTS_DATA.compare.seriesData.map(s => ({ ...s, type: 'line' }))
});

export const getGroupedBarChartOption = () => ({
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  legend: { data: ['Product A', 'Product B', 'Product C'] },
  xAxis: { type: 'category', data: ECHARTS_DATA.compare.categories },
  yAxis: { type: 'value' },
  series: ECHARTS_DATA.compare.seriesData.map(s => ({ ...s, type: 'bar' }))
});

export const getStackedBarChartOption = () => ({
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  legend: { data: ['Product A', 'Product B', 'Product C'] },
  xAxis: { type: 'category', data: ECHARTS_DATA.compare.categories },
  yAxis: { type: 'value' },
  series: ECHARTS_DATA.compare.seriesData.map(s => ({ ...s, type: 'bar', stack: 'total' }))
});

export const getAreaChartOption = () => ({
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', boundaryGap: false, data: ECHARTS_DATA.basic.categories },
  yAxis: { type: 'value' },
  series: [{
    data: ECHARTS_DATA.basic.lineData, type: 'line', areaStyle: {}
  }]
});

export const getStackedAreaChartOption = () => ({
  tooltip: { trigger: 'axis', axisPointer: { type: 'cross', label: { backgroundColor: '#6a7985' } } },
  legend: { data: ['Product A', 'Product B', 'Product C'] },
  xAxis: { type: 'category', boundaryGap: false, data: ECHARTS_DATA.compare.categories },
  yAxis: { type: 'value' },
  series: ECHARTS_DATA.compare.seriesData.map(s => ({ ...s, type: 'line', stack: 'Total', areaStyle: {}, emphasis: { focus: 'series' } }))
});

// --- 3. 대시보드 차트 (Dashboard Charts) ---
export const getKpiMiniChartOption = () => ({
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', show: false, data: ['1', '2', '3', '4', '5', '6', '7'] },
  yAxis: { type: 'value', show: false },
  grid: { left: 0, right: 0, top: 0, bottom: 0 },
  series: [{ data: [10, 22, 15, 35, 20, 45, 30], type: 'line', smooth: true, showSymbol: false, itemStyle: { color: '#05CD99' }, areaStyle: { opacity: 0.2, color: '#05CD99' } }]
});

export const getMonthlySalesChartOption = () => ({
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  xAxis: { type: 'category', data: ECHARTS_DATA.dashboard.monthlySales.map(i => i[0]) },
  yAxis: { type: 'value' },
  series: [{ data: ECHARTS_DATA.dashboard.monthlySales.map(i => i[1]), type: 'bar', itemStyle: { color: '#316AFF', borderRadius: [4, 4, 0, 0] } }]
});

export const getUserGrowthChartOption = () => ({
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['Q1', 'Q2', 'Q3', 'Q4'] },
  yAxis: { type: 'value' },
  series: [{ data: [1500, 2300, 3400, 5600], type: 'line', smooth: true, lineStyle: { width: 4 }, itemStyle: { color: '#EE5D50' } }]
});

export const getOrderStatusChartOption = () => ({
  tooltip: { trigger: 'item' },
  legend: { bottom: '0%' },
  series: [{
    name: 'Status', type: 'pie', radius: ['40%', '70%'], center: ['50%', '40%'],
    data: ECHARTS_DATA.dashboard.orderStatus
  }]
});

export const getKpiGaugeChartOption = () => {
  const current = 785;
  const target = 1000;
  const percentage = current / target; // 0.785

  return {
    series: [{
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: target,
      radius: '100%',
      center: ['50%', '75%'], // 차트 위치 조정 (하단 중앙)
      pointer: { show: false }, // 바늘 숨김
      axisTick: { show: false }, // 작은 눈금 숨김
      splitLine: { show: false }, // 큰 눈금 숨김
      axisLabel: { show: false }, // 숫자 라벨 숨김
      axisLine: {
        lineStyle: {
          width: 35, // 반원의 두께
          color: [
            [percentage, '#316AFF'], // 달성률까지 파란색
            [1, '#e2e8f0']           // 나머지는 회색
          ]
        }
      },
      detail: {
        valueAnimation: true,
        formatter: Math.round(percentage * 100) + '%',
        fontSize: 40,
        fontWeight: 'bold',
        color: '#333',
        offsetCenter: [0, '-10%'] // 퍼센트 텍스트 위치
      },
      data: [{ value: current }]
    }]
  };
};

export const getGaugeChartOption = () => ({
  tooltip: { formatter: '{a} <br/>{b} : {c}%' },
  series: [{
    name: 'Pressure', type: 'gauge',
    detail: { formatter: '{value}%', fontSize: 20 },
    data: [{ value: ECHARTS_DATA.dashboard.gaugeValue, name: 'SCORE' }]
  }]
});

// --- 4. 고급 차트 (Advanced Charts) ---
export const getTooltipCustomOption = () => ({
  tooltip: {
    trigger: 'axis',
    formatter: function (params: any) {
      let res = `<b>${params[0].name}</b><br/>`;
      params.forEach((item: any) => {
        res += `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${item.color};"></span>`;
        res += `${item.seriesName}: ₩${item.value.toLocaleString()}<br/>`;
      });
      return res;
    }
  },
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
  yAxis: { type: 'value' },
  series: [
    { name: 'Revenue', type: 'bar', data: [12000, 20000, 15000, 8000, 7000] },
    { name: 'Cost', type: 'bar', data: [8000, 12000, 9000, 4000, 5000] }
  ]
});

export const getLegendCustomOption = () => ({
  legend: {
    data: ['Series 1', 'Series 2'],
    icon: 'circle',
    textStyle: { color: '#333', fontSize: 14, fontWeight: 'bold' },
    bottom: 10
  },
  xAxis: { type: 'category', data: ['A', 'B', 'C'] },
  yAxis: { type: 'value' },
  series: [
    { name: 'Series 1', type: 'line', data: [1, 2, 3] },
    { name: 'Series 2', type: 'line', data: [3, 2, 1] }
  ]
});

export const getDataZoomOption = () => ({
  tooltip: { trigger: 'axis' },
  dataZoom: [{ type: 'inside' }, { type: 'slider', bottom: 10 }],
  xAxis: { type: 'category', data: Array.from({length: 50}, (_, i) => `Day ${i+1}`) },
  yAxis: { type: 'value' },
  series: [{ type: 'bar', data: Array.from({length: 50}, () => Math.floor(Math.random() * 100)) }]
});

export const getMarkLinePointOption = () => ({
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  yAxis: { type: 'value' },
  series: [{
    name: 'Max/Min', type: 'line', data: [10, 11, 13, 11, 12, 12, 9],
    markPoint: { data: [{ type: 'max', name: 'Max' }, { type: 'min', name: 'Min' }] },
    markLine: { data: [{ type: 'average', name: 'Avg' }] }
  }]
});

export const getVisualMapOption = () => ({
  tooltip: { trigger: 'item' },
  visualMap: { min: 0, max: 10, calculable: true, orient: 'horizontal', left: 'center', bottom: 10 },
  xAxis: { type: 'category', data: ['A', 'B', 'C', 'D', 'E'] },
  yAxis: { type: 'category', data: ['X', 'Y', 'Z', 'W'] },
  series: [{
    type: 'heatmap',
    data: ECHARTS_DATA.advanced.heatmapData,
    label: { show: true }
  }]
});

export const getRealtimeUpdateOption = (dataArr: number[]) => ({
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: Array.from({length: dataArr.length}, (_, i) => `${i}s`) },
  yAxis: { type: 'value', min: 0, max: 100 },
  series: [{ type: 'line', data: dataArr, smooth: true, animationDuration: 300 }]
});
