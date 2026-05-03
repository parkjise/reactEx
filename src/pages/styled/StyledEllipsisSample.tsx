// src/pages/styled/StyledEllipsisSample.tsx
import React from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { CodeViewer } from '../../components/CodeViewer';
import { textEllipsis, textEllipsisMulti } from '../../styles/mixins';

const SingleLine = styled.div`
  width: 250px;
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  margin-bottom: 30px;
  
  /* 1줄 말줄임 */
  ${textEllipsis}
`;

const MultiLine = styled.div<{ lines: number }>`
  width: 300px;
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  line-height: 1.5;
  margin-bottom: 10px;

  /* 다중 라인 말줄임 */
  ${({ lines }) => textEllipsisMulti(lines)}
`;

export const StyledEllipsisSample: React.FC = () => {
  const codeString = `/* [설명]
말줄임 처리는 제목, 설명, 테이블 셀처럼 길이가 예측되지 않는 텍스트가 레이아웃을 깨는 상황을 막습니다.
한 줄과 여러 줄 처리를 mixin으로 분리해 카드, 리스트, 테이블에서 반복 사용할 수 있습니다.
*/
// src/styles/mixins.ts
export const textEllipsis = css\`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
\`;

export const textEllipsisMulti = (line: number = 2) => css\`
  display: -webkit-box;
  -webkit-line-clamp: \${line};
  -webkit-box-orient: vertical;
  overflow: hidden;
\`;

// 컴포넌트 적용
const SingleLine = styled.div\`
  width: 250px;
  \${textEllipsis}
\`;

const MultiLine = styled.div\`
  width: 300px;
  \${textEllipsisMulti(3)} /* 3줄 넘어가면 말줄임 */
\`;`;

  return (
    <SamplePageLayout
      title="17. 말줄임 (Ellipsis) 처리 패턴"
      description="텍스트가 영역을 넘어갈 때 말줄임표(...)로 깔끔하게 처리하는 1줄 및 다중 라인 믹스인 사용법입니다."
    >
      <StyledCard>
        <h3>1. Single Line Ellipsis (1줄 말줄임)</h3>
        <p style={{ color: 'gray', marginBottom: '10px' }}>너비 250px 고정, 넘치면 자르고 ... 표시</p>
        <SingleLine>
          이 텍스트는 매우 길어서 한 줄을 넘어가게 됩니다. 그러면 자동으로 CSS 믹스인에 의해 말줄임 처리가 완벽하게 적용됩니다.
        </SingleLine>

        <h3>2. Multi Line Ellipsis (다중 라인 말줄임)</h3>
        <p style={{ color: 'gray', marginBottom: '10px' }}>너비 300px 고정, 2줄 또는 3줄 이상일 때 자르고 ... 표시</p>
        
        <h5 style={{ marginTop: '10px' }}>2줄 세팅</h5>
        <MultiLine lines={2}>
          이것은 상품의 상세 설명이나 블로그 포스트의 요약을 보여줄 때 아주 유용한 다중 라인 말줄임 처리 기술입니다.
          웹킷 전용 속성(-webkit-line-clamp)을 사용하지만, 현재 대부분의 모던 브라우저에서 아주 잘 지원하고 있습니다.
          따라서 실무에서 안심하고 사용할 수 있는 표준적인 방법입니다.
        </MultiLine>

        <h5 style={{ marginTop: '20px' }}>3줄 세팅</h5>
        <MultiLine lines={3}>
          이것은 상품의 상세 설명이나 블로그 포스트의 요약을 보여줄 때 아주 유용한 다중 라인 말줄임 처리 기술입니다.
          웹킷 전용 속성(-webkit-line-clamp)을 사용하지만, 현재 대부분의 모던 브라우저에서 아주 잘 지원하고 있습니다.
          따라서 실무에서 안심하고 사용할 수 있는 표준적인 방법입니다.
        </MultiLine>

        <div style={{ marginTop: '40px' }}>
          <CodeViewer rawCode={codeString} language="tsx" filename="Ellipsis Usage" />
        </div>
      </StyledCard>
    </SamplePageLayout>
  );
};
