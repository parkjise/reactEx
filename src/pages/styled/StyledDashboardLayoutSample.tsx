// src/pages/styled/StyledDashboardLayoutSample.tsx
import React from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { CodeViewer } from '../../components/CodeViewer';

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(120px, auto);
  gap: 20px;
  margin-bottom: 30px;
`;

// Span props를 받아서 그리드 칸 수 조절
const GridCell = styled.div<{ span?: number; rows?: number; bg?: string }>`
  grid-column: span ${({ span }) => span || 12};
  grid-row: span ${({ rows }) => rows || 1};
  
  background-color: ${({ bg, theme }) => bg || theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: bold;

  /* 반응형: 테블릿 이하에서는 무조건 12칸(전체 너비) 차지 */
  @media (max-width: 768px) {
    grid-column: span 12;
  }
`;

export const StyledDashboardLayoutSample: React.FC = () => {
  const codeString = `/* [설명]
대시보드 레이아웃은 12컬럼 Grid를 사용하면 KPI, 차트, 테이블 영역을 유연하게 배치할 수 있습니다.
GridCell의 span으로 데스크톱 배치를 조절하고 모바일에서는 한 컬럼으로 접어 겹침을 방지합니다.
*/
const DashboardGrid = styled.div\`
  display: grid;
  grid-template-columns: repeat(12, 1fr); // 12그리드 시스템
  gap: 20px;
\`;

const GridCell = styled.div<{ span?: number }>\`
  grid-column: span \${({ span }) => span || 12};
  
  @media (max-width: 768px) {
    grid-column: span 12; // 모바일에서는 무조건 100%
  }
\`;

// 사용부
<DashboardGrid>
  <GridCell span={3}>KPI 1</GridCell>
  <GridCell span={3}>KPI 2</GridCell>
  <GridCell span={3}>KPI 3</GridCell>
  <GridCell span={3}>KPI 4</GridCell>
  
  <GridCell span={8} rows={2}>메인 차트 (넓게)</GridCell>
  <GridCell span={4} rows={2}>사이드 목록 (좁게)</GridCell>
</DashboardGrid>`;

  return (
    <SamplePageLayout
      title="15. Dashboard Layout (12-Grid System)"
      description="CSS Grid를 활용하여 실무에서 가장 많이 쓰이는 12-Grid 기반 대시보드 레이아웃을 구성하는 방법입니다."
    >
      <StyledCard>
        <DashboardGrid>
          {/* 상단 KPI (3칸씩 4개 = 12칸) */}
          <GridCell span={3} bg="rgba(49, 106, 255, 0.05)">Total Users<br/><span style={{fontSize: '24px', color: '#316AFF'}}>1,204</span></GridCell>
          <GridCell span={3} bg="rgba(5, 205, 153, 0.05)">Revenue<br/><span style={{fontSize: '24px', color: '#05CD99'}}>$8,430</span></GridCell>
          <GridCell span={3} bg="rgba(255, 181, 71, 0.05)">Conversion<br/><span style={{fontSize: '24px', color: '#FFB547'}}>3.2%</span></GridCell>
          <GridCell span={3} bg="rgba(238, 93, 80, 0.05)">Bounce Rate<br/><span style={{fontSize: '24px', color: '#EE5D50'}}>42.1%</span></GridCell>

          {/* 중간 차트 레이아웃 */}
          <GridCell span={8} rows={2}>
            Main Activity Chart Area
            <div style={{ marginTop: '10px', fontSize: '0.85rem', fontWeight: 'normal' }}>
              (grid-column: span 8)
            </div>
          </GridCell>
          
          <GridCell span={4} rows={2}>
            Recent Transactions
            <div style={{ marginTop: '10px', fontSize: '0.85rem', fontWeight: 'normal' }}>
              (grid-column: span 4)
            </div>
          </GridCell>

          {/* 하단 넓은 영역 */}
          <GridCell span={12}>
            Full Width Data Table
            <div style={{ marginTop: '10px', fontSize: '0.85rem', fontWeight: 'normal' }}>
              (grid-column: span 12)
            </div>
          </GridCell>
        </DashboardGrid>

        <CodeViewer rawCode={codeString} language="tsx" filename="CSS Grid Layout" />
      </StyledCard>
    </SamplePageLayout>
  );
};
