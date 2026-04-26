// src/data/echartsSampleData.ts

export const ECHARTS_DATA = {
  // 1. 기본 차트 데이터
  basic: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    lineData: [150, 230, 224, 218, 135, 147, 260],
    barData: [120, 200, 150, 80, 70, 110, 130],
    pieData: [
      { value: 1048, name: 'Search Engine' },
      { value: 735, name: 'Direct' },
      { value: 580, name: 'Email' },
      { value: 484, name: 'Union Ads' },
      { value: 300, name: 'Video Ads' }
    ]
  },

  // 2. 비교 차트 데이터
  compare: {
    categories: ['2018', '2019', '2020', '2021', '2022', '2023'],
    seriesData: [
      { name: 'Product A', data: [120, 132, 101, 134, 90, 230] },
      { name: 'Product B', data: [220, 182, 191, 234, 290, 330] },
      { name: 'Product C', data: [150, 232, 201, 154, 190, 330] }
    ]
  },

  // 3. 대시보드 차트 데이터
  dashboard: {
    kpi: { value: 75, target: 100 },
    monthlySales: [
      ['Jan', 120], ['Feb', 200], ['Mar', 150], ['Apr', 80], 
      ['May', 70], ['Jun', 110], ['Jul', 130]
    ],
    gaugeValue: 65,
    orderStatus: [
      { value: 400, name: 'Completed' },
      { value: 300, name: 'Pending' },
      { value: 300, name: 'Returned' },
      { value: 200, name: 'Cancelled' }
    ]
  },

  // 4. 고급 기능 데이터
  advanced: {
    scatterData: [
      [10.0, 8.04], [8.0, 6.95], [13.0, 7.58], [9.0, 8.81], [11.0, 8.33], 
      [14.0, 9.96], [6.0, 7.24], [4.0, 4.26], [12.0, 10.84], [7.0, 4.82], [5.0, 5.68]
    ],
    heatmapData: [
      // [x, y, value]
      [0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0],
      [1, 0, 3], [1, 1, 2], [1, 2, 0], [1, 3, 0], [1, 4, 0],
      [2, 0, 4], [2, 1, 1], [2, 2, 2], [2, 3, 0], [2, 4, 0],
      [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0]
    ]
  }
};
