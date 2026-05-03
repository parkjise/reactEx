// src/pages/styled/StyledResponsiveSample.tsx
import React from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { CodeViewer } from '../../components/CodeViewer';
import { media } from '../../styles/mixins';

const ResponsiveGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  /* 미디어 쿼리 믹스인 사용 */
  ${media.desktop(`
    grid-template-columns: repeat(3, 1fr);
  `)}

  ${media.tablet(`
    grid-template-columns: repeat(2, 1fr);
  `)}

  ${media.mobile(`
    grid-template-columns: 1fr;
  `)}
`;

const GridItem = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const StyledResponsiveSample: React.FC = () => {
  const codeString = `/* [설명]
반응형 스타일은 breakpoint 값을 한 곳에 모아두고 mixin으로 재사용하면 화면 기준이 프로젝트 전체에서 흔들리지 않습니다.
카드 그리드, 폼, 사이드바처럼 넓이에 따라 구조가 달라지는 UI에 사용합니다.
*/
// src/styles/mixins.ts
export const media = {
  mobile: (styles: any) => css\`
    @media (max-width: 576px) { \${styles} }
  \`,
  tablet: (styles: any) => css\`
    @media (max-width: 768px) { \${styles} }
  \`,
  desktop: (styles: any) => css\`
    @media (max-width: 1024px) { \${styles} }
  \`
};

// Component
const ResponsiveGrid = styled.div\`
  display: grid;
  grid-template-columns: repeat(4, 1fr); // 기본 4열 (PC)

  \${media.desktop(\`
    grid-template-columns: repeat(3, 1fr); // 데스크탑 3열
  \`)}

  \${media.tablet(\`
    grid-template-columns: repeat(2, 1fr); // 태블릿 2열
  \`)}

  \${media.mobile(\`
    grid-template-columns: 1fr; // 모바일 1열
  \`)}
\`;`;

  return (
    <SamplePageLayout
      title="7. 반응형 레이아웃 (Media Queries)"
      description="브라우저 창 크기를 줄여보세요! 기기 해상도(PC, Tablet, Mobile)에 따라 4열 -> 3열 -> 2열 -> 1열로 변하는 반응형 그리드 시스템입니다."
    >
      <StyledCard>
        <p style={{ marginBottom: '20px' }}>
          실무에서는 <code>@media (max-width: 768px)</code>를 매번 하드코딩하지 않고, <br/>
          위 예제처럼 <code>media.tablet</code> 등의 믹스인을 만들어 유지보수성을 극대화합니다.
        </p>

        <ResponsiveGrid>
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
          <GridItem>Item 4</GridItem>
          <GridItem>Item 5</GridItem>
          <GridItem>Item 6</GridItem>
          <GridItem>Item 7</GridItem>
          <GridItem>Item 8</GridItem>
        </ResponsiveGrid>

        <div style={{ marginTop: '30px' }}>
          <CodeViewer rawCode={codeString} language="tsx" filename="Responsive Grid" />
        </div>
      </StyledCard>
    </SamplePageLayout>
  );
};
