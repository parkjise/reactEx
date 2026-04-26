import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Card } from '../components/common/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const ContentWrapper = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
`;

const TableSection = styled.div`
  flex: 1;
  min-width: 300px;
`;

const ChartSection = styled.div`
  flex: 1;
  min-width: 300px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  padding-left: 30px;

  @media (max-width: 768px) {
    border-left: none;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    padding-left: 0;
    padding-top: 30px;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  th {
    background-color: ${({ theme }) => theme.colors.surface};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.85rem;
  }

  tr {
    transition: background-color 0.2s;
    cursor: pointer;
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.background};
    }
  }
`;

const INITIAL_DATA = [
  { id: 1, category: '노트북', name: '맥북 프로 16인치', price: 3500000, color: '#316AFF' },
  { id: 2, category: '주변기기', name: '로지텍 MX Master 3S', price: 139000, color: '#05CD99' },
  { id: 3, category: '태블릿', name: '아이패드 프로 12.9', price: 1750000, color: '#FFB547' },
  { id: 4, category: '주변기기', name: '애플 매직 키보드', price: 179000, color: '#EE5D50' },
  { id: 5, category: '스마트폰', name: '아이폰 15 프로', price: 1550000, color: '#8b5cf6' },
];

export const DynamicPieChart: React.FC = () => {
  // 기본적으로 모든 아이템이 선택된 상태로 시작
  const [selectedIds, setSelectedIds] = useState<number[]>(INITIAL_DATA.map(d => d.id));

  const handleToggle = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // 선택된 항목만 필터링하여 카테고리별로 합산 (Derived State)
  const chartData = useMemo(() => {
    const selectedItems = INITIAL_DATA.filter(item => selectedIds.includes(item.id));
    
    const categoryMap = selectedItems.reduce((acc, curr) => {
      if (!acc[curr.category]) {
        acc[curr.category] = { name: curr.category, value: 0, color: curr.color };
      }
      acc[curr.category].value += curr.price;
      return acc;
    }, {} as Record<string, { name: string; value: number; color: string }>);

    return Object.values(categoryMap);
  }, [selectedIds]);

  return (
    <SamplePageLayout
      title="동적 파이 차트 (Dynamic Pie Chart)"
      icon="ri-pie-chart-line"
      description="테이블과 차트가 연동되는 데이터 시각화의 꽃입니다. 표에서 항목을 켜고 끌 때마다 차트 비율이 실시간으로 변합니다."
      learningPoints={[
        'React의 useMemo를 활용한 선택된 데이터의 실시간 재계산(Derived State) 기법',
        '테이블 상태(selectedIds)와 Recharts 데이터를 완벽하게 동기화하는 패턴',
        '애니메이션 효과가 내장된 Recharts Pie 컴포넌트의 특성 활용'
      ]}
      whyImportant="데이터 그리드(표)와 차트는 항상 함께 움직여야 합니다. 사용자가 보고 싶은 데이터만 필터링했을 때, 차트가 즉각적으로 반응하면 솔루션의 퀄리티가 비약적으로 상승합니다."
    >
      <Card title="카테고리별 매출 비중 (선택 가능)">
        <ContentWrapper>
          <TableSection>
            <StyledTable>
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>선택</th>
                  <th>카테고리</th>
                  <th>상품명</th>
                  <th style={{ textAlign: 'right' }}>금액</th>
                </tr>
              </thead>
              <tbody>
                {INITIAL_DATA.map((item) => (
                  <tr key={item.id} onClick={() => handleToggle(item.id)}>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(item.id)} 
                        onChange={() => {}} // tr onClick으로 이벤트 위임
                        onClick={(e) => e.stopPropagation()} 
                      />
                    </td>
                    <td>
                      <span style={{ 
                        display: 'inline-block', 
                        width: '10px', height: '10px', 
                        borderRadius: '50%', backgroundColor: item.color, 
                        marginRight: '8px' 
                      }} />
                      {item.category}
                    </td>
                    <td>{item.name}</td>
                    <td style={{ textAlign: 'right' }}>₩{item.price.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </TableSection>

          <ChartSection>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => `₩${value.toLocaleString()}`}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                <i className="ri-pie-chart-2-line" style={{ fontSize: '3rem', marginBottom: '10px', display: 'block' }} />
                선택된 데이터가 없습니다.
              </div>
            )}
          </ChartSection>
        </ContentWrapper>
      </Card>
    </SamplePageLayout>
  );
};
